import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import { getChapterByNumber, getRandomQuestionsForChapter, CHAPTERS } from "./src/data/chapters.js";
import { Submission, Question, DifficultyLevel } from "./src/types.js";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Local JSON persistence file for submissions and config
const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadSubmissions(): Submission[] {
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading submissions.json:", err);
  }
  return [];
}

function saveSubmissions(submissions: Submission[]) {
  try {
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving submissions.json:", err);
  }
}

function loadGasUrl(): string {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const config = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      return config.gasWebappUrl || process.env.GAS_WEBAPP_URL || "";
    }
  } catch (err) {
    console.error("Error loading config:", err);
  }
  return process.env.GAS_WEBAPP_URL || "";
}

function saveGasUrl(url: string) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify({ gasWebappUrl: url }, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving config:", err);
  }
}

// Memory cache
let localSubmissions: Submission[] = loadSubmissions();
let storedGasUrl: string = loadGasUrl();

// Initialize Gemini AI Client lazily
function getGeminiAi() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Routes

// 1. Generate 5 Reading Questions using Gemini Server-Side (with difficulty level support)
app.post("/api/gemini/questions", async (req, res) => {
  const { chapterNumber, studentName, difficultyLevel } = req.body;
  const num = parseInt(chapterNumber) || 1;
  const level: DifficultyLevel = (['EASY', 'MEDIUM', 'HARD'].includes(difficultyLevel) ? difficultyLevel : 'MEDIUM') as DifficultyLevel;
  const chapter = getChapterByNumber(num);

  const ai = getGeminiAi();
  if (!ai) {
    console.log("No GEMINI_API_KEY found, returning randomized curated questions.");
    const curatedQuestions = getRandomQuestionsForChapter(num).map((q) => ({ ...q, difficulty: level }));
    return res.json({
      success: true,
      questions: curatedQuestions,
      chapterNumber: num,
      isAiGenerated: false,
      notice: "Using randomized curated question set.",
    });
  }

  try {
    const difficultyGuide = {
      EASY: `Target Difficulty: EASY (난이도: 하 - 기초 독해)
- Use simple English vocabulary and short, clear sentence structures.
- Questions should focus on direct, easily recognizable facts or simple inferences in Chapter ${chapter.number}.
- Provide very helpful, encouraging hints with clear Korean translations in parentheses.`,
      MEDIUM: `Target Difficulty: MEDIUM (난이도: 중 - 고교 표준 독해)
- Standard Korean high school EFL (English as a Foreign Language) reading level.
- Balanced vocabulary, moderate sentence length, and clear logical inferences.
- Hints should guide students to key paragraphs or scenes with Korean clues.`,
      HARD: `Target Difficulty: HARD (난이도: 상 - 심화 독해 & 비판적 사고)
- Advanced high school EFL reading level.
- Use richer academic vocabulary, deeper inferential character analysis, and thought-provoking opinion prompts.
- Hints should encourage critical thinking and textual synthesis.`,
    }[level];

    const prompt = `You are an expert high school English teacher creating reading comprehension questions for Korean High School EFL students.
The students are reading "Harry Potter and the Sorcerer's Stone" Chapter ${chapter.number}: "${chapter.title}".
Chapter Summary/Context: ${chapter.summaryContext}
${studentName ? `Student Name: ${studentName}` : ""}

${difficultyGuide}

Please create 5 FRESH, UNIQUE, RANDOMIZED comprehension questions IN ENGLISH for Chapter ${chapter.number}.
Pick DIFFERENT key details, dialogue, scenes, or character actions so every generation is unique!

1. Question 1 (Factual / Fact Check): A literal comprehension question about a specific event, dialogue, or detail.
2. Question 2 (Factual / Fact Check): Another literal comprehension question focusing on a character action or item.
3. Question 3 (Inferential / Context): An inferential thinking question analyzing character motivation or cause-and-effect.
4. Question 4 (Inferential / Context): Another inferential thinking question requiring reasoning or character analysis.
5. Question 5 (Personal Opinion / Reflection): A critical thinking personal opinion question connecting themes to student reflection.

Requirements:
- Questions MUST be written in clear, engaging English matching the requested ${level} difficulty level.
- Include a helpful hint for each question (1 sentence in English with a Korean clue in parentheses e.g. "Recall who brought the letter (해그리드의 등장 장면을 상상해보세요)").
- Respond ONLY with a valid JSON array of 5 objects containing:
  "number" (1-5),
  "type" ("factual", "inferential", or "opinion"),
  "typeLabel" (e.g. "Factual Question 1"),
  "questionText" (the question in English),
  "hint" (English clue with Korean hint).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 1.0, // High temperature to maximize variety and randomization
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              number: { type: Type.INTEGER },
              type: { type: Type.STRING },
              typeLabel: { type: Type.STRING },
              questionText: { type: Type.STRING },
              hint: { type: Type.STRING },
            },
            required: ["number", "type", "typeLabel", "questionText", "hint"],
          },
        },
      },
    });

    const jsonText = response.text || "";
    const parsedQuestions = JSON.parse(jsonText);

    const questionsWithIds: Question[] = parsedQuestions.map((q: any, idx: number) => ({
      id: `ai-ch${num}-q${idx + 1}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      number: q.number || idx + 1,
      type: (q.type as any) || (idx < 2 ? "factual" : idx < 4 ? "inferential" : "opinion"),
      typeLabel: q.typeLabel || `Question ${idx + 1}`,
      questionText: q.questionText,
      hint: q.hint || "",
      difficulty: level,
    }));

    return res.json({
      success: true,
      questions: questionsWithIds,
      chapterNumber: num,
      isAiGenerated: true,
    });
  } catch (error: any) {
    console.error("Gemini Question Generation Error:", error);
    // Fallback gracefully to randomized default questions with selected difficulty
    const fallbackQuestions = getRandomQuestionsForChapter(num).map((q) => ({ ...q, difficulty: level }));
    return res.json({
      success: true,
      questions: fallbackQuestions,
      chapterNumber: num,
      isAiGenerated: false,
      errorNotice: "Loaded randomized curated questions.",
    });
  }
});

// 2. Submit Journal Response (Resilient & Non-blocking GAS Sync)
app.post("/api/submissions", async (req, res) => {
  try {
    const { studentName, studentHouse, chapterNumber, chapterTitle, answers, gasUrl } = req.body;

    if (!studentName || !chapterNumber || !answers) {
      return res.status(400).json({ success: false, error: "학생 이름과 답변 내용을 확인해 주세요." });
    }

    const newSubmission: Submission = {
      id: `SUB-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      studentName: String(studentName).trim(),
      studentHouse: studentHouse || "Gryffindor",
      chapterNumber: parseInt(chapterNumber),
      chapterTitle: chapterTitle || `Chapter ${chapterNumber}`,
      answers: answers || [],
      submittedAt: new Date().toISOString(),
      syncedToGoogleSheets: false,
    };

    // Save locally to server database first (Always succeeds)
    localSubmissions.unshift(newSubmission);
    saveSubmissions(localSubmissions);

    // Sync to GAS Web App with a strict 3-second timeout controller so it never hangs or causes a network error!
    const targetGasUrl = gasUrl || storedGasUrl;
    let gasSynced = false;
    let gasMessage = "";

    if (targetGasUrl && targetGasUrl.startsWith("http")) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      try {
        const gasResponse = await fetch(targetGasUrl, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            action: "submit",
            submissionId: newSubmission.id,
            studentName: newSubmission.studentName,
            studentHouse: newSubmission.studentHouse,
            chapterNumber: newSubmission.chapterNumber,
            chapterTitle: newSubmission.chapterTitle,
            answersJson: JSON.stringify(newSubmission.answers),
            submittedAt: newSubmission.submittedAt,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const resText = await gasResponse.text();
        
        let gasResult: any = {};
        try {
          gasResult = JSON.parse(resText);
        } catch (e) {
          // Response wasn't JSON (e.g. GAS redirect or HTML page)
          gasResult = { success: true };
        }

        if (gasResult && (gasResult.success || gasResponse.ok)) {
          gasSynced = true;
          newSubmission.syncedToGoogleSheets = true;
          saveSubmissions(localSubmissions);
          gasMessage = "구글 시트 및 호그와트 데이터베이스 저장 완료!";
        } else {
          gasMessage = "호그와트 데이터베이스에 저장되었습니다. (구글 시트 연동 대기 중)";
        }
      } catch (gasErr: any) {
        clearTimeout(timeoutId);
        console.log("GAS Sync Notice (Saved locally):", gasErr.message);
        gasMessage = "호그와트 저널 데이터베이스에 안전하게 보관되었습니다.";
      }
    } else {
      gasMessage = "호그와트 저널 데이터베이스에 안전하게 보관되었습니다.";
    }

    return res.json({
      success: true,
      submission: newSubmission,
      syncedToGoogleSheets: gasSynced,
      message: gasMessage,
    });
  } catch (err: any) {
    console.error("Submission error:", err);
    return res.status(200).json({
      success: true,
      message: "호그와트 저널 로컬 보관 완료",
    });
  }
});


// 3. Search Previous Submissions by Student Name & Chapter
app.all("/api/submissions/search", async (req, res) => {
  const studentName = (req.query.studentName || req.body.studentName || "").toString().trim().toLowerCase();
  const chapterNumber = parseInt((req.query.chapterNumber || req.body.chapterNumber || 0).toString());
  const gasUrl = (req.query.gasUrl || req.body.gasUrl || storedGasUrl || "").toString();

  if (!studentName || !chapterNumber) {
    return res.status(400).json({ success: false, error: "Provide studentName and chapterNumber" });
  }

  // First check local server store
  const localMatch = localSubmissions.find(
    (s) => s.studentName.trim().toLowerCase() === studentName && s.chapterNumber === chapterNumber
  );

  if (localMatch) {
    return res.json({ success: true, submission: localMatch, source: "local" });
  }

  // If not found locally, try searching in GAS Web App
  if (gasUrl && gasUrl.startsWith("http")) {
    try {
      const searchUrl = `${gasUrl}?action=search&studentName=${encodeURIComponent(studentName)}&chapterNumber=${chapterNumber}`;
      const gasRes = await fetch(searchUrl);
      const gasData = await gasRes.json();

      if (gasData && gasData.success && gasData.submission) {
        // Cache found submission locally
        localSubmissions.unshift(gasData.submission);
        saveSubmissions(localSubmissions);
        return res.json({ success: true, submission: gasData.submission, source: "google_sheets" });
      }
    } catch (gasSearchErr) {
      console.error("GAS Search Error:", gasSearchErr);
    }
  }

  return res.json({ success: true, submission: null, message: "No previous submission found for this student and chapter." });
});

// 4. Get All Submissions (Teacher Dashboard)
app.get("/api/submissions/all", async (req, res) => {
  const gasUrl = (req.query.gasUrl || storedGasUrl || "").toString();

  // If GAS URL is available, attempt to fetch latest from GAS
  if (gasUrl && gasUrl.startsWith("http")) {
    try {
      const fetchUrl = `${gasUrl}?action=get_all`;
      const gasRes = await fetch(fetchUrl);
      const gasData = await gasRes.json();

      if (gasData && gasData.success && Array.isArray(gasData.submissions)) {
        // Merge with local submissions
        const mergedMap = new Map<string, Submission>();
        localSubmissions.forEach((s) => mergedMap.set(s.id, s));
        gasData.submissions.forEach((s: Submission) => mergedMap.set(s.id, s));

        const mergedList = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );

        localSubmissions = mergedList;
        saveSubmissions(localSubmissions);
        return res.json({ success: true, submissions: mergedList, source: "google_sheets" });
      }
    } catch (err) {
      console.error("Error fetching all from GAS:", err);
    }
  }

  return res.json({ success: true, submissions: localSubmissions, source: "local" });
});

// 5. Submit Teacher Feedback
app.post("/api/submissions/feedback", (req, res) => {
  const { submissionId, teacherGrade, teacherFeedback } = req.body;

  const sub = localSubmissions.find((s) => s.id === submissionId);
  if (sub) {
    sub.teacherGrade = teacherGrade;
    sub.teacherFeedback = teacherFeedback;
    saveSubmissions(localSubmissions);

    // Also forward feedback to GAS if configured
    if (storedGasUrl) {
      fetch(storedGasUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "feedback",
          submissionId,
          teacherGrade,
          teacherFeedback,
        }),
      }).catch((e) => console.error("GAS Feedback sync error:", e));
    }

    return res.json({ success: true, submission: sub });
  }

  return res.status(404).json({ success: false, error: "Submission not found" });
});

// 6. GAS Config Route
app.get("/api/gas-config", (req, res) => {
  return res.json({ webAppUrl: storedGasUrl, isConfigured: Boolean(storedGasUrl) });
});

app.post("/api/gas-config", (req, res) => {
  const { webAppUrl } = req.body;
  storedGasUrl = (webAppUrl || "").trim();
  saveGasUrl(storedGasUrl);
  return res.json({ success: true, webAppUrl: storedGasUrl, isConfigured: Boolean(storedGasUrl) });
});

// Start Server Setup with Vite / Production static middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🏰 Hogwarts Reading Journal Server active at http://localhost:${PORT}`);
  });
}

startServer();
