import { ChapterInfo, Question } from '../types';

export const CHAPTERS: ChapterInfo[] = [
  {
    number: 1,
    title: "The Boy Who Lived",
    subtitle: "Chapter 1",
    summaryContext: "Mr. and Mrs. Dursley live at Number Four Privet Drive. Strange owls, strange people in cloaks appear everywhere. Dumbledore, McGonagall, and Hagrid leave baby Harry Potter on the Dursleys' doorstep after Lord Voldemort's downfall.",
    keyTopics: ["The Dursleys", "Strange Events", "Arrival at Privet Drive", "The Lightning Scar"],
    defaultQuestions: [
      {
        id: "ch1-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What strange signs did Mr. Dursley notice on his way to work on Tuesday morning?",
        koreanTranslation: "화요일 아침, 더슬리 씨가 출근길에 목격한 이상한 징조들은 무엇이었나요?",
        hint: "Think about cats reading maps, people in strange cloaks, and owls flying in broad daylight."
      },
      {
        id: "ch1-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "Who brought baby Harry Potter to Privet Drive, and what vehicle did he arrive on?",
        koreanTranslation: "아기 해리 포터를 프리벳 가로 데려온 사람은 누구이며, 어떤 탈것을 타고 도착했나요?",
        hint: "Recall the giant man's name and his magical mode of transportation from Sirius Black."
      },
      {
        id: "ch1-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did Professor Dumbledore decide it was better for Harry to grow up with the Dursleys rather than in the wizarding world?",
        koreanTranslation: "덤블도어 교수는 왜 해리가 마법사 세계보다 더슬리 가족 밑에서 자라는 것이 더 낫다고 판단했나요?",
        hint: "Consider how growing up famous before he could walk might affect a child's personality."
      },
      {
        id: "ch1-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "How do Professor McGonagall and Dumbledore differ in their attitudes toward the Dursleys?",
        koreanTranslation: "맥고나걸 교수와 덤블도어 교수는 더슬리 가족에 대해 어떤 시각 차이를 보이고 있나요?",
        hint: "Look at McGonagall's observations of Dudley kicking his mother vs Dumbledore's calm long-term view."
      },
      {
        id: "ch1-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Do you agree with Dumbledore's choice to leave Harry with relatives who dislike magic? Explain why or why not in 2-3 sentences.",
        koreanTranslation: "마법을 싫어하는 친척에게 해리를 맡긴 덤블도어의 선택에 동의하나요? 그 이유를 2~3문장으로 설명해보세요.",
        hint: "Express your own perspective with clear reasons (e.g., safety vs emotional wellbeing)."
      }
    ]
  },
  {
    number: 2,
    title: "The Vanishing Glass",
    subtitle: "Chapter 2",
    summaryContext: "Ten years pass. Harry is treated poorly by the Dursleys, living under the stairs. On Dudley's birthday trip to the zoo, Harry accidentally makes the glass of the boa constrictor enclosure vanish.",
    keyTopics: ["Life Under the Stairs", "Dudley's Birthday", "The Zoo Visit", "The Brazilian Boa Constrictor"],
    defaultQuestions: [
      {
        id: "ch2-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "Where did Harry sleep in the Dursley household for the past ten years?",
        hint: "It is a small, dark space under a set of steps in the house."
      },
      {
        id: "ch2-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What surprising event happened at the reptile house in the zoo during Dudley's birthday trip?",
        hint: "Focus on Harry's silent communication with the snake and what happened to the glass wall."
      },
      {
        id: "ch2-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why was Uncle Vernon so furious with Harry even though Harry did not consciously intend to vanish the glass?",
        hint: "Think about the Dursleys' extreme fear and hatred of anything unusual or magical."
      },
      {
        id: "ch2-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "How does Harry's interaction with the snake show his empathy and unique nature?",
        hint: "Notice how Harry understood the snake's feeling of being trapped and never seeing Brazil."
      },
      {
        id: "ch2-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "If you were in Harry's position growing up with the Dursleys, how would you maintain hope and resilience?",
        hint: "Share personal strategies for staying positive during unfair or difficult situations."
      }
    ]
  },
  {
    number: 3,
    title: "The Letters from No One",
    subtitle: "Chapter 3",
    summaryContext: "Hogwarts acceptance letters begin arriving for Harry. Uncle Vernon tries everything to destroy them, moving the family to a hotel, then to a desolate hut on a rock in the sea on the night before Harry's 11th birthday.",
    keyTopics: ["The Hogwarts Letter", "Vernon's Desperation", "Moving to Cokeworth", "The Shack on the Rock"],
    defaultQuestions: [
      {
        id: "ch3-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "How was the first letter addressed to Harry in exact detail?",
        hint: "Think about the room location specified on the envelope (The Cupboard under the Stairs)."
      },
      {
        id: "ch3-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "Where did Uncle Vernon take the family to escape the relentless flood of letters?",
        hint: "First a dingy hotel in Cokeworth, then an isolated shack surrounded by stormy sea water."
      },
      {
        id: "ch3-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why was Uncle Vernon willing to go to such extreme lengths to prevent Harry from reading his letter?",
        hint: "Consider what reading the letter would mean for Harry's knowledge of his parents and magic."
      },
      {
        id: "ch3-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What contrast does the author build between Dudley's reaction to losing his television and Harry counting down to midnight?",
        hint: "Compare Dudley's spoiled tantrums with Harry's quiet counting of his birthday seconds on Dudley's watch."
      },
      {
        id: "ch3-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "How would you feel if you turned 11 and discovered a mysterious letter addressed specifically to your room? Describe your emotions.",
        hint: "Reflect on feelings of curiosity, disbelief, excitement, or hesitation."
      }
    ]
  },
  {
    number: 4,
    title: "The Keeper of the Keys",
    subtitle: "Chapter 4",
    summaryContext: "At midnight, Rubeus Hagrid breaks down the door of the shack. He presents Harry with a birthday cake, reveals Harry is a wizard, gives him his Hogwarts letter, and tells him the truth about his parents and Voldemort.",
    keyTopics: ["Hagrid's Entrance", "You're a Wizard, Harry", "The Truth about James and Lily", "The Defeat of Voldemort"],
    defaultQuestions: [
      {
        id: "ch4-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What present did Hagrid bring for Harry's eleventh birthday?",
        hint: "It was a slightly squashed chocolate cake with green icing reading 'Happy Birthday Harry'."
      },
      {
        id: "ch4-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What lie had Petunia and Vernon told Harry about how his parents died?",
        hint: "They told him his parents died in a mundane car crash."
      },
      {
        id: "ch4-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did Hagrid lose his temper and give Dudley a pig's tail?",
        hint: "Recall Uncle Vernon insulting Albus Dumbledore in front of Hagrid."
      },
      {
        id: "ch4-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "How does Aunt Petunia's outburst about her sister Lily reveal her inner jealousy and resentment?",
        hint: "Notice how she described Lily being admired by her parents as a 'freak'."
      },
      {
        id: "ch4-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Which piece of news Hagrid shared would have been most shocking to you if you were Harry? Why?",
        hint: "Choose between finding out you are a wizard, learning about your parents, or knowing Voldemort's story."
      }
    ]
  },
  {
    number: 5,
    title: "Diagon Alley",
    subtitle: "Chapter 5",
    summaryContext: "Hagrid takes Harry to London, opening the gateway behind the Leaky Cauldron to Diagon Alley. They visit Gringotts Wizarding Bank, buy school supplies, meet Draco Malfoy in Madam Malkin's, and Hagrid gifts Harry Hedwig.",
    keyTopics: ["The Leaky Cauldron", "Gringotts & Vault 713", "Madam Malkin's & Draco", "Ollivanders Wand Shop"],
    defaultQuestions: [
      {
        id: "ch5-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What special item did Hagrid retrieve from Vault 713 in Gringotts for Dumbledore?",
        hint: "A small grubby paper package secret item."
      },
      {
        id: "ch5-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What core and wood make up Harry's wand purchased at Ollivanders?",
        hint: "Holly and phoenix feather, eleven inches long."
      },
      {
        id: "ch5-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did Mr. Ollivander find it significant that the phoenix feather in Harry's wand came from the same bird as Voldemort's wand?",
        hint: "Consider the magical connection and twin core symbolism between Harry and Voldemort."
      },
      {
        id: "ch5-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "How does Harry's first meeting with the boy in Madam Malkin's (Draco) compare to his experiences with Dudley?",
        hint: "Notice the boy's arrogant tone, talk of blood purity, and condescending attitude."
      },
      {
        id: "ch5-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "If you could visit one shop in Diagon Alley, which would you enter first and what would you purchase? Explain your choice.",
        hint: "Choose between Ollivanders, Flourish and Blotts, Eeylops Owl Emporium, Quality Quidditch Supplies, etc."
      }
    ]
  },
  {
    number: 6,
    title: "The Journey from Platform Nine and Three-Quarters",
    subtitle: "Chapter 6",
    summaryContext: "Uncle Vernon drops Harry at King's Cross. Harry meets the Weasley family who help him reach Platform 9 3/4. On the Hogwarts Express, Harry meets Ron Weasley, Hermione Granger, and Neville Longbottom, and rejects Draco Malfoy's hand.",
    keyTopics: ["King's Cross Station", "The Weasley Family", "The Hogwarts Express", "Meeting Ron & Hermione", "Rejecting Malfoy"],
    defaultQuestions: [
      {
        id: "ch6-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "How did Mrs. Weasley instruct Harry to get onto Platform Nine and Three-Quarters?",
        hint: "Walking straight at the barrier between platforms nine and ten without stopping."
      },
      {
        id: "ch6-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "Who came into Harry and Ron's train compartment looking for Neville Longbottom's lost toad?",
        hint: "A girl with bushy brown hair and large front teeth (Hermione Granger)."
      },
      {
        id: "ch6-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did Harry instantly bond with Ron on the train compartment?",
        hint: "Consider Ron's insecurity about being poor/having older brothers and Harry's generosity in sharing sweets."
      },
      {
        id: "ch6-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What does Harry's refusal to shake Draco Malfoy's hand reveal about Harry's character values?",
        hint: "Think about Harry choosing friends based on loyalty and kindness rather than wealth or status."
      },
      {
        id: "ch6-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Which magical treat bought from the Hogwarts Express trolley (Chocolate Frogs, Every Flavour Beans, etc.) would you be most excited to try? Why?",
        hint: "Explain what appeals to you about the magic or risk behind the sweets."
      }
    ]
  },
  {
    number: 7,
    title: "The Sorting Hat",
    subtitle: "Chapter 7",
    summaryContext: "The first-years arrive at Hogwarts castle, welcomed by Professor McGonagall. In the Great Hall, the Sorting Hat sings its song and sorts the students. Harry is sorted into Gryffindor after asking not to be put in Slytherin.",
    keyTopics: ["Arrival at Hogwarts", "The Sorting Ceremony", "Gryffindor vs Slytherin", "The Start-of-Term Feast"],
    defaultQuestions: [
      {
        id: "ch7-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What four houses make up Hogwarts School of Witchcraft and Wizardry?",
        hint: "Gryffindor, Hufflepuff, Ravenclaw, Slytherin."
      },
      {
        id: "ch7-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What advice or plea did Harry silently repeat to the Sorting Hat while it was on his head?",
        hint: "He kept repeating 'Not Slytherin, not Slytherin'."
      },
      {
        id: "ch7-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did the Sorting Hat consider placing Harry in Slytherin before honoring his preference for Gryffindor?",
        hint: "Think about Harry's talent, determination, and potential for greatness noted by the Hat."
      },
      {
        id: "ch7-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What impression does Professor Snape give Harry during the start-of-term feast when their eyes meet?",
        hint: "Describe the sharp pain in Harry's scar and Snape's intense, dark gaze."
      },
      {
        id: "ch7-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Which Hogwarts house do you believe best matches your personality traits (bravery, intelligence, loyalty, ambition)? Explain why.",
        hint: "Match your personal values to the characteristics of one of the four houses."
      }
    ]
  },
  {
    number: 8,
    title: "The Potions Master",
    subtitle: "Chapter 8",
    summaryContext: "Harry gets used to Hogwarts classes and moving staircases. In Potions, Professor Snape singles Harry out and criticizes him. Harry reads about the Gringotts break-in and realizes Vault 713 was targeted right after Hagrid emptied it.",
    keyTopics: ["Life at Hogwarts", "Professor Snape's Lesson", "Tea with Hagrid", "The Gringotts Break-in"],
    defaultQuestions: [
      {
        id: "ch8-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What three difficult questions did Professor Snape ask Harry during their very first Potions class?",
        hint: "Asphodel and wormwood, bezoar location, difference between monkshood and wolfsbane."
      },
      {
        id: "ch8-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What news clipping from the Daily Prophet did Harry read while having tea at Hagrid's hut?",
        hint: "An article reporting an attempted robbery at Gringotts Bank on July 31st."
      },
      {
        id: "ch8-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why does Snape seem to harbor an instant dislike toward Harry from their very first encounter?",
        hint: "Consider Harry's famous reputation and Snape's past connection to Harry's father James."
      },
      {
        id: "ch8-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What connection did Harry establish between Hagrid's Gringotts errand and the news report about Vault 713?",
        hint: "Vault 713 was emptied on the exact same day Hagrid took the package."
      },
      {
        id: "ch8-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "How would you handle a teacher who appears unfair or hostile toward you, as Snape was toward Harry? Explain your strategy.",
        hint: "Discuss remaining calm, seeking advice from mentors, or proving yourself through performance."
      }
    ]
  },
  {
    number: 9,
    title: "The Midnight Duel",
    subtitle: "Chapter 9",
    summaryContext: "During Flying lessons, Malfoy steals Neville's Remembrall. Harry flies after Malfoy and catches it, impressing McGonagall who makes him Gryffindor Seeker. Malfoy challenges Harry to a midnight duel, but tricking them, causing them to encounter Fluffy, the three-headed dog on the third floor.",
    keyTopics: ["Flying Lesson", "The Remembrall Catch", "Gryffindor Seeker", "The Midnight Trap", "Fluffy"],
    defaultQuestions: [
      {
        id: "ch9-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What object belonging to Neville did Draco Malfoy snatch during Flying class?",
        hint: "A glass ball filled with smoke that turns red when you forget something (Remembrall)."
      },
      {
        id: "ch9-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What creature did Harry, Ron, Hermione, and Neville run into on the forbidden third-floor corridor?",
        hint: "A monstrous three-headed dog standing over a trapdoor."
      },
      {
        id: "ch9-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did Professor McGonagall reward Harry with a spot on the Quidditch team instead of punishing him for flying without permission?",
        hint: "She recognized his extraordinary natural flying ability and saw an opportunity for Gryffindor."
      },
      {
        id: "ch9-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What key observation did Hermione make about the three-headed dog that the boys missed because they were panicking?",
        hint: "She noticed it was standing on top of a trapdoor, guarding something underneath."
      },
      {
        id: "ch9-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Do you think Harry was right to accept Malfoy's midnight duel challenge despite school rules? Why or why not?",
        hint: "Weigh pride and courage against school discipline and Malfoy's trap."
      }
    ]
  },
  {
    number: 10,
    title: "Hallowe'en",
    subtitle: "Chapter 10",
    summaryContext: "Harry receives a Nimbus 2000 broomstick. Wood teaches him Quidditch rules. On Halloween, Professor Quirrell bursts in claiming a troll is in the dungeons. Harry and Ron rescue Hermione in the girls' bathroom, sealing their friendship.",
    keyTopics: ["Nimbus 2000", "Quidditch Rules", "Troll in the Dungeon", "Girl's Bathroom Rescue", "A Golden Trio Friendship"],
    defaultQuestions: [
      {
        id: "ch10-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What broomstick model was sent to Harry anonymously by Professor McGonagall?",
        hint: "A sleek, top-of-the-line Nimbus 2000."
      },
      {
        id: "ch10-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "Which spell did Ron use to defeat the mountain troll in the girls' bathroom?",
        hint: "Wingardium Leviosa (levitating the troll's own club)."
      },
      {
        id: "ch10-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why was Hermione crying in the girls' bathroom before the troll arrived?",
        hint: "She overheard Ron making unkind comments about her having no friends."
      },
      {
        id: "ch10-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "Why did Hermione lie to Professor McGonagall about going to look for the troll herself?",
        hint: "She took the blame to protect Harry and Ron from getting expelled after they saved her."
      },
      {
        id: "ch10-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "The narrator notes that 'there are some things you can't share without ending up liking each other.' Do you agree? Share a personal reflection or example.",
        hint: "Reflect on how shared challenges or scary moments build deep friendships."
      }
    ]
  },
  {
    number: 11,
    title: "Quidditch",
    subtitle: "Chapter 11",
    summaryContext: "Harry plays in his first Quidditch match against Slytherin. Snape appears to be jinxing Harry's broomstick. Hermione sets fire to Snape's robes to break the spell. Harry catches the Golden Snitch in his mouth. Hagrid mentions Nicolas Flamel.",
    keyTopics: ["First Quidditch Match", "Jinxed Broom", "Hermione's Bluebell Flames", "Catching the Snitch", "Nicolas Flamel Clue"],
    defaultQuestions: [
      {
        id: "ch11-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "How did Harry catch the Golden Snitch during his first Quidditch match?",
        hint: "He nearly swallowed it when he tumbled off his broomstick."
      },
      {
        id: "ch11-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What action did Hermione take in the stands when she saw Harry losing control of his broom?",
        hint: "She sneaked to Snape's seat and cast a small fire spell on his robes."
      },
      {
        id: "ch11-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why did the trio believe Professor Snape was trying to kill Harry during the match?",
        hint: "Snape was staring unblinkingly at Harry and muttering eye-contact counter-curses."
      },
      {
        id: "ch11-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What slip-of-the-tongue did Hagrid make when defending Snape to the children?",
        hint: "He accidentally blurted out that what Fluffy is guarding is between Dumbledore and Nicolas Flamel."
      },
      {
        id: "ch11-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "If you were playing a Quidditch match, which position (Seeker, Chaser, Beater, Keeper) would you want to play and why?",
        hint: "Choose based on speed, physical strength, strategy, or scoring goals."
      }
    ]
  },
  {
    number: 12,
    title: "The Mirror of Erised",
    subtitle: "Chapter 12",
    summaryContext: "Christmas at Hogwarts. Harry receives an anonymous Invisibility Cloak. Searching the restricted section at night, he discovers the Mirror of Erised, which shows him his parents and family. Dumbledore explains the mirror's dangerous allure.",
    keyTopics: ["Christmas at Hogwarts", "The Invisibility Cloak", "The Mirror of Erised", "Seeing His Parents", "Dumbledore's Warning"],
    defaultQuestions: [
      {
        id: "ch12-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What anonymous Christmas gift did Harry receive that belonged to his father?",
        hint: "A light, silvery Invisibility Cloak."
      },
      {
        id: "ch12-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What did Harry see when he looked into the Mirror of Erised?",
        hint: "He saw himself surrounded by his parents, James and Lily, and his extended family."
      },
      {
        id: "ch12-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "What is the meaning behind the inscription 'Erised' on top of the mirror frame?",
        hint: "Read 'Erised' backwards (Desire) — it shows the deepest desire of a person's heart."
      },
      {
        id: "ch12-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "Why did Dumbledore warn Harry that 'it does not do to dwell on dreams and forget to live'?",
        hint: "Men have wasted away before the mirror becoming entranced by impossible desires."
      },
      {
        id: "ch12-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "If you looked into the Mirror of Erised today, what do you think you would see? (Keep it appropriate and reflective).",
        hint: "Reflect on your heart's deepest wish or goal (e.g. family peace, success, personal growth)."
      }
    ]
  },
  {
    number: 13,
    title: "Nicolas Flamel",
    subtitle: "Chapter 13",
    summaryContext: "Harry remembers where he saw Flamel's name — on Dumbledore's Chocolate Frog card! Flamel is the creator of the Sorcerer's Stone. Snape referees the next Quidditch match, which Harry wins quickly. Harry follows Snape into the Forbidden Forest.",
    keyTopics: ["Chocolate Frog Card Clue", "The Sorcerer's Stone", "Snape Refereeing", "Forest Conversation"],
    defaultQuestions: [
      {
        id: "ch13-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "Where did Harry finally remember reading the name 'Nicolas Flamel'?",
        hint: "On the back of Albus Dumbledore's Chocolate Frog trading card."
      },
      {
        id: "ch13-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What two miraculous powers does the Sorcerer's Stone possess according to Hermione's book?",
        hint: "Turns metal into pure gold and produces the Elixir of Life making the drinker immortal."
      },
      {
        id: "ch13-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why was Snape eager to referee the Gryffindor vs. Hufflepuff Quidditch match himself?",
        hint: "The trio believed he wanted to intimidate Harry or prevent Gryffindor from winning."
      },
      {
        id: "ch13-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "What did Harry deduce from listening to Snape pressuring Professor Quirrell in the Forbidden Forest?",
        hint: "Snape was trying to force Quirrell to reveal how to bypass his protection spell for the Stone."
      },
      {
        id: "ch13-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Why do you think human beings are fascinated by items that grant immortality like the Sorcerer's Stone? What are the potential dangers?",
        hint: "Discuss fear of death, greed, overpopulation, or unnatural consequences."
      }
    ]
  },
  {
    number: 14,
    title: "Norbert the Norwegian Ridgeback",
    subtitle: "Chapter 14",
    summaryContext: "Hagrid wins a dragon egg in a pub poker game. The egg hatches into Norbert, a Norwegian Ridgeback. As keeping a dragon is illegal, the trio arrange for Charlie Weasley's friends to take Norbert away at midnight from the astronomy tower.",
    keyTopics: ["Hagrid's Dragon Egg", "Norbert Hatching", "Malfoy's Discovery", "Smuggling Norbert to Astronomy Tower"],
    defaultQuestions: [
      {
        id: "ch14-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "How did Hagrid acquire the dragon egg in the village pub?",
        hint: "He won it in a game of cards from a hooded stranger."
      },
      {
        id: "ch14-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "What species was Hagrid's baby dragon, and what name did he give it?",
        hint: "Norwegian Ridgeback named Norbert."
      },
      {
        id: "ch14-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why was keeping Norbert so dangerous for both Hagrid and the school?",
        hint: "Dragon breeding was outlawed in 1709 and the growing beast could burn down Hagrid's wooden hut."
      },
      {
        id: "ch14-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "How did Malfoy find out about the secret dragon, and how did he plan to use this against Harry and Hagrid?",
        hint: "He peeked through Hagrid's hut window and caught Ron with Charlie's letter."
      },
      {
        id: "ch14-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Do you think Hagrid's love for dangerous magical creatures is a strength or a weakness? Explain your view.",
        hint: "Balance his gentle heart and empathy against the safety risks to students."
      }
    ]
  },
  {
    number: 15,
    title: "The Forbidden Forest",
    subtitle: "Chapter 15",
    summaryContext: "Harry, Hermione, Neville, and Malfoy serve detention in the Forbidden Forest with Hagrid for being out of bed. They search for a wounded unicorn. Harry sees a cloaked figure drinking unicorn blood and is rescued by the centaur Firenze.",
    keyTopics: ["Detention in the Forest", "Shedding Unicorn Blood", "The Cloaked Figure", "Firenze the Centaur"],
    defaultQuestions: [
      {
        id: "ch15-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "Why were Harry, Hermione, Neville, and Malfoy assigned detention in the Forbidden Forest?",
        hint: "For being out of dormitory after hours on the Astronomy Tower."
      },
      {
        id: "ch15-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "Which centaur rescued Harry from the hooded figure in the forest and carried him on his back?",
        hint: "Firenze, a palomino centaur with blue eyes."
      },
      {
        id: "ch15-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "According to Firenze, why would someone slay a pure, defenseless unicorn to drink its blood?",
        hint: "Unicorn blood keeps a person alive when inches from death, but at a terrible cursed price."
      },
      {
        id: "ch15-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "Why were the other centaurs (Bane and Ronan) angry at Firenze for carrying Harry on his back?",
        hint: "They believed centaurs should not submit to humans or interfere with planetary prophecies."
      },
      {
        id: "ch15-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "What does the concept of a 'cursed half-life' from drinking unicorn blood suggest about the consequences of desperate immortality?",
        hint: "Reflect on moral boundaries and living a life devoid of soul or happiness."
      }
    ]
  },
  {
    number: 16,
    title: "Through the Trapdoor",
    subtitle: "Chapter 16",
    summaryContext: "Dumbledore is lured away to London. Harry, Ron, and Hermione decide to go through the trapdoor tonight. They overcome Fluffy (music), Devil's Snare (fire), Flying Keys (broom), Giant Wizard's Chess (Ron's sacrifice), and Potion riddle (Hermione).",
    keyTopics: ["Dumbledore Called Away", "Devil's Snare", "Winged Keys", "Wizard's Chess", "Logic Potions Riddle"],
    defaultQuestions: [
      {
        id: "ch16-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "What instrument did Harry play to put Fluffy the three-headed dog to sleep?",
        hint: "A wooden flute given to him by Hagrid."
      },
      {
        id: "ch16-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "How did Hermione solve the dangerous Devil's Snare plant constraint?",
        hint: "She summoned bright magical fire (Lumos/bluebell flames) because Devil's Snare hates light and heat."
      },
      {
        id: "ch16-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "How did Ron demonstrate true bravery and tactical brilliance in the Giant Wizard's Chess game?",
        hint: "He sacrificed his own knight piece (taking a heavy blow) so Harry could checkmate the king."
      },
      {
        id: "ch16-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "Why did Hermione remark that 'many of the greatest wizards haven't got an ounce of logic' during the potion riddle?",
        hint: "The obstacle relied on pure brainpower and logic rather than magic tricks."
      },
      {
        id: "ch16-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "Which of the magical obstacles (Devil's Snare, Flying Keys, Chessboard, Logic Riddle) would have tested your personal skills the most? Why?",
        hint: "Assess your strengths in physical agility, bravery, logic, or remaining calm under pressure."
      }
    ]
  },
  {
    number: 17,
    title: "The Man with Two Faces",
    subtitle: "Chapter 17",
    summaryContext: "Harry enters the final room and finds Quirrell, not Snape! Voldemort's face lives on the back of Quirrell's head. Harry gets the Stone from the Mirror of Erised because he wanted to find it, not use it. Touching Harry burns Quirrell. Dumbledore arrives, Gryffindor wins the House Cup!",
    keyTopics: ["Quirrell & Voldemort", "The Mirror's Secret", "Love's Protection", "Hospital Wing", "The House Cup Win"],
    defaultQuestions: [
      {
        id: "ch17-q1",
        number: 1,
        type: "factual",
        typeLabel: "Factual Question 1 (Fact Check)",
        questionText: "Who was actually waiting in the final chamber trying to steal the Sorcerer's Stone?",
        hint: "Professor Quirrell with Voldemort attached to the back of his head."
      },
      {
        id: "ch17-q2",
        number: 2,
        type: "factual",
        typeLabel: "Factual Question 2 (Fact Check)",
        questionText: "How did Harry manage to get the Sorcerer's Stone inside his pocket from the Mirror of Erised?",
        hint: "Dumbledore enchanted the mirror so only someone who wanted to find the Stone — but not use it — could get it."
      },
      {
        id: "ch17-q3",
        number: 3,
        type: "inferential",
        typeLabel: "Inferential Question 1 (Context & Reasoning)",
        questionText: "Why was Quirrell unable to touch Harry's bare skin without suffering agonizing burns?",
        hint: "Harry was protected by his mother's ultimate sacrifice — an ancient magic based on love in his blood."
      },
      {
        id: "ch17-q4",
        number: 4,
        type: "inferential",
        typeLabel: "Inferential Question 2 (Context & Reasoning)",
        questionText: "Why did Dumbledore award Neville Longbottom 10 points at the end-of-year feast, clinching Gryffindor's victory?",
        hint: "Dumbledore noted that it takes a great deal of bravery to stand up to enemies, but even more to stand up to friends."
      },
      {
        id: "ch17-q5",
        number: 5,
        type: "opinion",
        typeLabel: "Personal Opinion Question (Critical Thinking)",
        questionText: "What is the most important lesson or message you learned from reading Harry Potter and the Sorcerer's Stone?",
        hint: "Reflect on themes of love, friendship, choices over ability, or courage."
      }
    ]
  }
];

export function getChapterByNumber(num: number): ChapterInfo {
  return CHAPTERS.find(c => c.number === num) || CHAPTERS[0];
}

export function getRandomQuestionsForChapter(num: number): Question[] {
  const chapter = getChapterByNumber(num);
  const baseQuestions = chapter.defaultQuestions;

  const timestamp = Date.now();
  const randomSalt = Math.floor(Math.random() * 10000);

  return baseQuestions.map((q, idx) => {
    const isMultipleChoice = idx < 3;
    const format = isMultipleChoice ? 'multiple_choice' : 'short_answer';

    // Provide default options & explanations if missing in base static data
    const options = q.options && q.options.length === 4 ? q.options : (
      isMultipleChoice ? [
        `Option A: ${q.questionText.slice(0, 30)}...`,
        `Option B: Key event in Chapter ${num}`,
        `Option C: Secondary character detail`,
        `Option D: Unexpected plot twist`
      ] : []
    );

    const correctOptionIndex = typeof q.correctOptionIndex === 'number' ? q.correctOptionIndex : 0;
    const explanation = q.explanation || (
      isMultipleChoice
        ? `정답은 ${correctOptionIndex + 1}번입니다. 원서 Chapter ${num} 내용에 언급된 핵심 사건 및 인물의 행동과 일치합니다.`
        : `[모범 답안 가이드] 질문의 의도에 맞게 원서의 인물 행동이나 인과관계를 설명하고 자신의 생각을 2~3문장 이상 한국어로 명확히 기술하였는지 확인하세요.`
    );

    return {
      ...q,
      id: `rand-ch${num}-q${idx + 1}-${timestamp}-${randomSalt}`,
      number: idx + 1,
      format,
      typeLabel: isMultipleChoice ? `객관식 독해 ${idx + 1}` : `서술형/단답형 ${idx + 1}`,
      options,
      correctOptionIndex,
      explanation,
    };
  });
}
