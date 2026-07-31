export const GAS_SCRIPT_CODE = `/**
 * Google Apps Script (GAS) Web App Code for Hogwarts Reading Journal
 * 
 * [설치 및 사용 방법]
 * 1. 새 구글 시트(Google Sheets)를 생성합니다.
 * 2. 상단 메뉴에서 [확장 프로그램] -> [Apps Script]를 클릭합니다.
 * 3. 기존 코드를 모두 지우고 아래 코드를 그대로 붙여넣습니다.
 * 4. 우측 상단 [배포] -> [새 배포] 클릭.
 * 5. 유형 선택: [웹 앱]
 * 6. 설명: Hogwarts Journal Backend
 * 7. 다음 사용자 지정: [나]
 * 8. 액세스 권한이 있는 사용자: [모든 사용자] (Anyone) **필수**
 * 9. [배포] 버튼 클릭 후 생성된 '웹 앱 URL'을 복사하여 앱 내 설정창에 입력하세요!
 */

function doGet(e) {
  var action = e.parameter.action;
  var studentName = e.parameter.studentName;
  var chapterNumber = e.parameter.chapterNumber;
  
  var sheet = getOrCreateSheet();
  
  if (action === 'search' && studentName && chapterNumber) {
    var result = findSubmission(sheet, studentName, parseInt(chapterNumber));
    return ContentService.createTextOutput(JSON.stringify({ success: true, submission: result }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  if (action === 'get_all') {
    var submissions = getAllSubmissions(sheet);
    return ContentService.createTextOutput(JSON.stringify({ success: true, submissions: submissions }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    message: "Hogwarts Journal GAS Web App is active! Use POST or valid GET parameters."
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action || 'submit';
    var sheet = getOrCreateSheet();

    if (action === 'submit') {
      var id = contents.submissionId || "SUB-" + new Date().getTime();
      var studentName = contents.studentName || "Anonymous";
      var studentHouse = contents.studentHouse || "Gryffindor";
      var chapterNumber = contents.chapterNumber || 1;
      var chapterTitle = contents.chapterTitle || "";
      var answersJson = contents.answersJson || "[]";
      var submittedAt = contents.submittedAt || new Date().toISOString();

      sheet.appendRow([
        id,
        submittedAt,
        studentName,
        studentHouse,
        chapterNumber,
        chapterTitle,
        answersJson,
        "", // teacherGrade
        ""  // teacherFeedback
      ]);

      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Successfully saved to Google Sheet!",
        submissionId: id
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'search') {
      var result = findSubmission(sheet, contents.studentName, contents.chapterNumber);
      return ContentService.createTextOutput(JSON.stringify({ success: true, submission: result }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'get_all') {
      var submissions = getAllSubmissions(sheet);
      return ContentService.createTextOutput(JSON.stringify({ success: true, submissions: submissions }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (action === 'feedback') {
      var updateResult = updateFeedback(sheet, contents.submissionId, contents.teacherGrade, contents.teacherFeedback);
      return ContentService.createTextOutput(JSON.stringify({ success: updateResult, message: updateResult ? "Feedback updated" : "Submission not found" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid action" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("HogwartsJournal");
  if (!sheet) {
    sheet = ss.insertSheet("HogwartsJournal");
    sheet.appendRow([
      "Submission ID",
      "Submitted At",
      "Student Name",
      "House",
      "Chapter Number",
      "Chapter Title",
      "Answers JSON",
      "Teacher Grade",
      "Teacher Feedback"
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#1e293b").setFontColor("#f59e0b");
  }
  return sheet;
}

function findSubmission(sheet, studentName, chapterNumber) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return null;

  var normName = String(studentName).trim().toLowerCase();
  var normCh = parseInt(chapterNumber);

  for (var i = data.length - 1; i >= 1; i--) {
    var row = data[i];
    var rowName = String(row[2]).trim().toLowerCase();
    var rowCh = parseInt(row[4]);

    if (rowName === normName && rowCh === normCh) {
      var answers = [];
      try {
        answers = JSON.parse(row[6]);
      } catch (e) {
        answers = [];
      }
      return {
        id: row[0],
        submittedAt: row[1],
        studentName: row[2],
        studentHouse: row[3],
        chapterNumber: row[4],
        chapterTitle: row[5],
        answers: answers,
        teacherGrade: row[7],
        teacherFeedback: row[8]
      };
    }
  }
  return null;
}

function getAllSubmissions(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];

  var submissions = [];
  for (var i = data.length - 1; i >= 1; i--) {
    var row = data[i];
    var answers = [];
    try {
      answers = JSON.parse(row[6]);
    } catch (e) {
      answers = [];
    }
    submissions.push({
      id: row[0],
      submittedAt: row[1],
      studentName: row[2],
      studentHouse: row[3],
      chapterNumber: row[4],
      chapterTitle: row[5],
      answers: answers,
      teacherGrade: row[7],
      teacherFeedback: row[8]
    });
  }
  return submissions;
}
`;
