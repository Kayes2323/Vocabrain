import type { ObjectiveSection } from '../../model';

/**
 * Vocab Brain Academic Mock Test 1 — Reading. Three original passages written
 * for Vocab Brain at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material.
 */
export const mock1Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Humble Pencil',
        paragraphs: [
          {
            id: '1',
            text: 'Few objects are as ordinary as the pencil, yet its history involves a lucky discovery, a closely guarded mine and a wartime shortage. The story begins in the 1560s in Borrowdale, a valley in the north-west of England, where a storm is said to have uprooted a tree and exposed a large deposit of a black, shiny mineral. The substance was graphite, and the Borrowdale deposit was the purest that had ever been found: so pure, in fact, that it could be sawn into solid sticks without any further treatment.',
          },
          {
            id: '2',
            text: 'At first, nobody knew what the material was. Because it left a dark grey mark and looked metallic, people assumed it was a form of lead, and they called it “plumbago”, from the Latin word for lead. This misunderstanding survives today: we still talk about pencil “lead”, even though pencils have never contained any. The first people to find a use for graphite were local shepherds, who used lumps of it to mark their sheep so that they could identify their own animals. Soon, however, writers and artists realised that it made a clear line that could be rubbed out, something that ink could not offer. The problem was that graphite is soft and brittle, and it blackened the hands of anyone who held it. Early users therefore wrapped the sticks in string or cloth, and later pushed them into hollowed-out pieces of wood.',
          },
          {
            id: '3',
            text: 'Graphite soon became valuable for another reason. It could be used to line the moulds in which cannonballs were made, producing smoother and more accurate shot. The English government therefore took control of the Borrowdale mine. Guards were posted at its entrance, and it was opened for only about six weeks each year, when enough graphite was removed to meet the country’s needs. The rest of the year it was flooded to prevent theft. Even so, smuggling was common, and stolen graphite was sold in London at high prices.',
          },
          {
            id: '4',
            text: 'Because England controlled the only reliable source of pure graphite, other countries struggled to make good pencils. The situation became serious for France in the 1790s, when war with England cut off supplies completely. The French government asked Nicolas-Jacques Conté, a scientist and inventor, to find a solution. His answer, patented in 1795, was to grind impure graphite into a powder, mix it with clay and water, and bake the mixture in a kiln. The result was a strong, smooth writing core that could be produced from graphite of much lower quality than the Borrowdale mineral. Conté’s pencils were also far cheaper to make than English ones.',
          },
          {
            id: '5',
            text: 'Conté’s method had a further advantage. By changing the proportion of clay to graphite, manufacturers could control the hardness of the pencil. More clay produced a harder pencil that made a lighter line, suitable for technical drawing; less clay gave a softer, darker line preferred by artists. The grading systems still printed on pencils, such as HB or 2B, are a direct result of this discovery. Remarkably, the basic recipe has hardly changed since Conté’s time, and modern pencil factories still combine graphite and clay in much the same way.',
          },
          {
            id: '6',
            text: 'The appearance of the pencil changed in the nineteenth century. Manufacturers in the United States found that the best graphite of the period came from China, where yellow was traditionally associated with royalty and respect. To suggest that their pencils contained high-quality Chinese graphite, American companies began painting them yellow. The strategy was so successful that yellow became the standard colour for pencils in North America. Other additions followed: in 1858 an American stationer, Hymen Lipman, received a patent for attaching a small eraser to the end of a pencil, a combination that many people now take for granted.',
          },
          {
            id: '7',
            text: 'In an age of screens, it might seem that the pencil has little future. Yet billions are still produced every year. Pencils work in extreme cold and in zero gravity, they do not leak, and a single one can draw a line many kilometres long. For many designers and architects, a sketch made in pencil remains the fastest way to think on paper. The Borrowdale mine closed long ago, but the material it revealed continues to leave its mark.',
          },
        ],
      },
      groups: [
        {
          id: 'r1-g1',
          type: 'note-completion',
          instructions: 'Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          template:
            'The history of the pencil\n• 1560s: a very pure deposit of {{1}} is found in Borrowdale\n• first used by shepherds to mark their {{2}}\n• early users wrapped the sticks in string or {{3}} to keep their hands clean\n• the mine was flooded for most of the year to stop {{4}}\n• Conté mixed powdered graphite with {{5}} and water\n• the amount of this ingredient controls the {{6}} of a pencil\n• US companies painted pencils {{7}} to suggest they contained Chinese graphite',
          questions: [
            { id: 'm1r-q1', number: 1, answer: { accepted: ['graphite'] }, explanation: { text: 'The substance found was graphite.', evidence: { paragraphId: '1', quote: 'The substance was graphite' } } },
            { id: 'm1r-q2', number: 2, answer: { accepted: ['sheep'] }, explanation: { text: 'Shepherds marked their sheep.', evidence: { paragraphId: '2', quote: 'used lumps of it to mark their sheep' } } },
            { id: 'm1r-q3', number: 3, answer: { accepted: ['cloth'] }, explanation: { text: 'Graphite blackened hands, so it was wrapped.', evidence: { paragraphId: '2', quote: 'Early users therefore wrapped the sticks in string or cloth' } } },
            { id: 'm1r-q4', number: 4, answer: { accepted: ['theft'] }, explanation: { text: '“Stop” paraphrases “prevent”.', evidence: { paragraphId: '3', quote: 'it was flooded to prevent theft' } } },
            { id: 'm1r-q5', number: 5, answer: { accepted: ['clay'] }, explanation: { text: 'Powdered graphite + clay + water, baked in a kiln.', evidence: { paragraphId: '4', quote: 'mix it with clay and water' } } },
            { id: 'm1r-q6', number: 6, answer: { accepted: ['hardness'] }, explanation: { text: '“Amount of this ingredient” paraphrases “proportion of clay”.', evidence: { paragraphId: '5', quote: 'manufacturers could control the hardness of the pencil' } } },
            { id: 'm1r-q7', number: 7, answer: { accepted: ['yellow'] }, explanation: { text: 'Yellow suggested Chinese graphite.', evidence: { paragraphId: '6', quote: 'American companies began painting them yellow' } } },
          ],
        },
        {
          id: 'r1-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm1r-q8',
              number: 8,
              prompt: 'The Borrowdale graphite was purer than any other deposit known at the time.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: '“The purest that had ever been found.”', evidence: { paragraphId: '1', quote: 'the Borrowdale deposit was the purest that had ever been found' } },
            },
            {
              id: 'm1r-q9',
              number: 9,
              prompt: 'People originally believed that graphite was a kind of lead.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: '“People assumed it was a form of lead.”', evidence: { paragraphId: '2', quote: 'people assumed it was a form of lead' } },
            },
            {
              id: 'm1r-q10',
              number: 10,
              prompt: 'The Borrowdale mine was worked throughout the year.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'It was opened for only about six weeks each year.', evidence: { paragraphId: '3', quote: 'it was opened for only about six weeks each year' } },
            },
            {
              id: 'm1r-q11',
              number: 11,
              prompt: 'Conté’s pencils cost more to produce than English pencils.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'They were far cheaper to make.', evidence: { paragraphId: '4', quote: 'Conté’s pencils were also far cheaper to make than English ones' } },
            },
            {
              id: 'm1r-q12',
              number: 12,
              prompt: 'Conté’s method was quickly copied by manufacturers in other countries.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage says the recipe is still used today, but never says how quickly other countries adopted it.',
                evidence: { paragraphId: '5', quote: 'the basic recipe has hardly changed since Conté’s time' },
                distractors: { TRUE: '“Still used today” does not tell us it was copied quickly.' },
              },
            },
            {
              id: 'm1r-q13',
              number: 13,
              prompt: 'Pencil makers today still mix graphite with clay.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: '“Modern pencil factories still combine graphite and clay.”', evidence: { paragraphId: '5', quote: 'modern pencil factories still combine graphite and clay in much the same way' } },
            },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 2
    {
      id: 'r2',
      number: 2,
      passage: {
        title: 'Letting Rivers Run Wild',
        subtitle: 'Across Europe, engineers are undoing centuries of work on the continent’s rivers.',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'For hundreds of years, European rivers were treated as problems to be solved. Winding channels were straightened, banks were lined with concrete, and thousands of weirs and small dams were built to power mills or to control water levels. Much of this work had a clear purpose: by draining the wet land beside rivers, farmers gained valuable fields for agriculture, and towns could be built closer to the water. Today, however, a growing number of engineers and ecologists are trying to reverse these changes, a process often described as river rewilding.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'One reason for this change of approach is flooding. A straightened river is shorter and smoother than a natural one, so water flows through it much faster. After heavy rain, the water from a large area of countryside therefore reaches towns downstream at the same time, producing a sudden, dangerous peak. A winding river with a wide floodplain behaves very differently: water spreads out over fields and wetlands, slows down, and arrives downstream gradually. Paradoxically, the engineering that was meant to protect people has in many places made floods more severe for those living further along the river.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'Some of the most effective river engineers are not human at all. Beavers, which were hunted almost to extinction in Europe by the nineteenth century, have been reintroduced to several countries. By felling trees and building dams from branches and mud, beavers create chains of ponds along small streams. These ponds hold back water during storms and release it slowly in dry periods, and they trap soil that would otherwise cloud the water further downstream. Dr Maria Ferraz, who has studied beaver sites in Portugal and Spain, describes the animals as “the cheapest flood engineers we have”.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Not everyone welcomes these changes. When a project in eastern England proposed to reconnect a river to its old floodplain, several farmers objected strongly, arguing that the scheme would flood land their families had farmed for generations. The project went ahead only after the farmers were offered payments for accepting occasional flooding and were given a role in deciding where water would be allowed to spread. Dr Ruth Adeyemi, a social scientist who studied the dispute, argues that such involvement is not a courtesy but a necessity. “Projects that are designed without the people who live beside the river,” she says, “rarely survive long enough to succeed.”',
          },
          {
            id: 'E',
            labelled: true,
            text: 'Supporters of rewilding also point to cost. In one Dutch city, engineers compared two ways of protecting the town centre: raising the existing concrete flood walls, or buying farmland upstream and allowing the river to flood it naturally. The second option was estimated to cost about forty per cent less over thirty years, largely because natural floodplains require little maintenance, whereas concrete walls must be inspected and repaired regularly. According to hydrologist Dr Hana Kovač, the same logic applies on a smaller scale. She argues that removing the thousands of small, forgotten weirs that block European rivers often achieves more for fish and wildlife than a few large, expensive restoration schemes.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'Some benefits were not predicted at all. When a series of weirs was removed from a river in northern Germany, the aim was simply to allow fish to migrate upstream. Two years later, a brewery in the valley reported that the water it drew from the river was so much cleaner that it had been able to reduce its spending on filtration. Local tourism has also grown, as anglers and canoeists return to stretches of river that had been neglected for decades.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'Measuring success, however, is not straightforward. Many projects report the number of fish counted before and after restoration, but ecologist Dr Sven Lindqvist warns that this can give a false picture: fish numbers vary greatly from year to year because of weather and disease, and a single good year may say little about the health of the river. Professor Liam Ortega adds that patience is essential. In his experience, a river that has been heavily modified may need twenty years or more to recover its natural shape and wildlife, far longer than the five-year funding periods most projects receive. Rewilding, it seems, is less a single act of engineering than a long conversation with the river.',
          },
        ],
      },
      groups: [
        {
          id: 'r2-g1',
          type: 'matching-information',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? You may use any letter more than once.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((id) => ({ id, text: `Paragraph ${id}` })),
          questions: [
            { id: 'm1r-q14', number: 14, prompt: 'an unexpected advantage for a local business', answer: { accepted: ['F'] }, explanation: { text: 'The brewery could spend less on filtration: a benefit nobody predicted.', evidence: { paragraphId: 'F', quote: 'Some benefits were not predicted at all.' } } },
            { id: 'm1r-q15', number: 15, prompt: 'an explanation of why altering a river’s course can make floods worse', answer: { accepted: ['B'] }, explanation: { text: 'Straight channels send water downstream all at once.', evidence: { paragraphId: 'B', quote: 'the water from a large area of countryside therefore reaches towns downstream at the same time' } } },
            { id: 'm1r-q16', number: 16, prompt: 'a description of how an animal changes the flow of water', answer: { accepted: ['C'] }, explanation: { text: 'Beaver ponds hold back water and release it slowly.', evidence: { paragraphId: 'C', quote: 'These ponds hold back water during storms and release it slowly' } } },
            { id: 'm1r-q17', number: 17, prompt: 'an example of landowners opposing a scheme', answer: { accepted: ['D'] }, explanation: { text: 'Farmers objected to the floodplain project.', evidence: { paragraphId: 'D', quote: 'several farmers objected strongly' } } },
            { id: 'm1r-q18', number: 18, prompt: 'a comparison of the costs of two methods', answer: { accepted: ['E'] }, explanation: { text: 'Raising walls vs letting farmland flood.', evidence: { paragraphId: 'E', quote: 'The second option was estimated to cost about forty per cent less over thirty years' } } },
          ],
        },
        {
          id: 'r2-g2',
          type: 'matching-features',
          instructions: 'Look at the following statements (Questions 19–22) and the list of people below. Match each statement with the correct person, A–E.',
          optionsTitle: 'List of People',
          options: [
            { id: 'A', text: 'Maria Ferraz' },
            { id: 'B', text: 'Ruth Adeyemi' },
            { id: 'C', text: 'Hana Kovač' },
            { id: 'D', text: 'Sven Lindqvist' },
            { id: 'E', text: 'Liam Ortega' },
          ],
          questions: [
            { id: 'm1r-q19', number: 19, prompt: 'Restored rivers may take much longer to recover than funding allows.', answer: { accepted: ['E'] }, explanation: { text: 'Twenty years vs five-year funding periods.', evidence: { paragraphId: 'G', quote: 'may need twenty years or more to recover … far longer than the five-year funding periods' } } },
            { id: 'm1r-q20', number: 20, prompt: 'The involvement of local residents is essential to a project’s success.', answer: { accepted: ['B'] }, explanation: { text: '“Not a courtesy but a necessity.”', evidence: { paragraphId: 'D', quote: 'such involvement is not a courtesy but a necessity' } } },
            { id: 'm1r-q21', number: 21, prompt: 'Many small actions can be more useful than a few large ones.', answer: { accepted: ['C'] }, explanation: { text: 'Removing small weirs can achieve more than large schemes.', evidence: { paragraphId: 'E', quote: 'removing the thousands of small, forgotten weirs … often achieves more … than a few large, expensive restoration schemes' } } },
            { id: 'm1r-q22', number: 22, prompt: 'One commonly used measure of success can be misleading.', answer: { accepted: ['D'] }, explanation: { text: 'Fish counts “can give a false picture”.', evidence: { paragraphId: 'G', quote: 'this can give a false picture' }, distractors: { E: 'Ortega talks about time, not measurement.' } } },
          ],
        },
        {
          id: 'r2-g3',
          type: 'summary-completion',
          instructions: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          template:
            'Why rivers are being rewilded\nIn the past, river banks were often lined with {{23}}, and land beside rivers was drained for {{24}}. But in a straightened river, water from a wide area arrives downstream at the same {{25}}, causing sudden floods. Natural features can reduce this: the ponds made by {{26}} store water during storms and release it slowly.',
          questions: [
            { id: 'm1r-q23', number: 23, answer: { accepted: ['concrete'] }, explanation: { text: 'Banks were lined with concrete.', evidence: { paragraphId: 'A', quote: 'banks were lined with concrete' } } },
            { id: 'm1r-q24', number: 24, answer: { accepted: ['agriculture'] }, explanation: { text: 'Draining land gave farmers fields for agriculture.', evidence: { paragraphId: 'A', quote: 'farmers gained valuable fields for agriculture' } } },
            { id: 'm1r-q25', number: 25, answer: { accepted: ['time'] }, explanation: { text: '“At the same time” produces a sudden peak.', evidence: { paragraphId: 'B', quote: 'reaches towns downstream at the same time' } } },
            { id: 'm1r-q26', number: 26, answer: { accepted: ['beavers'] }, explanation: { text: 'Beavers create chains of ponds.', evidence: { paragraphId: 'C', quote: 'beavers create chains of ponds' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'Can Machines Be Creative?',
        paragraphs: [
          {
            id: '1',
            text: 'In 2018, a portrait produced with the help of a computer program was sold at an auction in New York for more than forty times its estimated price. The sale provoked a debate that has only grown more heated since: if a machine can produce a picture that people are willing to pay for, should we call the machine creative? For some commentators, this is simply a question of how words are defined. I would argue, however, that it touches on something more important: what it is that we value in human creativity in the first place.',
          },
          {
            id: '2',
            text: 'A widely used definition, proposed by the cognitive scientist Margaret Boden, holds that a creative idea must be new, surprising and valuable. Boden distinguishes between ideas that are new only to the person who has them, as when a child works out a rule of arithmetic without being taught it, and ideas that are new to the whole of human history. By either standard, it is hard to deny that some computer systems produce work that is new and surprising. In 2016, a program designed to play the board game Go made a move that expert commentators at first dismissed as a mistake, only to recognise later that it had been brilliant. Whether such output is valuable, though, is a judgement that people, not machines, have to make.',
          },
          {
            id: '3',
            text: 'Critics of machine creativity usually raise one of two objections. The first is that computers merely recombine the material they have been given: a system trained on millions of paintings, the argument goes, can only produce variations on what already exists. This argument is weaker than it first appears. Human artists also learn by absorbing the work of others; no composer has ever written music without first having heard a great deal of it. The difference between people and machines here is one of degree rather than of kind.',
          },
          {
            id: '4',
            text: 'The second objection is more persuasive. Creativity, critics say, involves intention: an artist is trying to express something, to solve a problem or to communicate with an audience. A program has no such purpose; it produces output because it has been instructed to. It is the programmer, or the person who selects the best results from thousands of attempts, who supplies the intention. In the case of the auctioned portrait, the decision about which image to print, frame and sell was made by a small group of young artists, not by their software. On this view, the machine is less an artist than an extraordinarily sophisticated brush.',
          },
          {
            id: '5',
            text: 'Some researchers have tried to answer this objection by building systems that assess their own work. One research team in Lisbon has developed a program that, after producing each picture, writes a short description of what it was trying to achieve and discards images that fail to meet its own aims. The team argues that people will accept software as creative only if it can explain and judge its own work. It is an ingenious approach, although it is not clear that a program which has been instructed to have aims really has aims of its own.',
          },
          {
            id: '6',
            text: 'Perhaps the more interesting question is not whether machines are creative, but how they will change human creativity. Photography offers a useful comparison. When cameras appeared in the nineteenth century, some painters feared that their profession would disappear. Instead, freed from the need to record faces and places accurately, many painters began to experiment with colour, light and form, and, some art historians argue, movements such as Impressionism followed. Creative software may have a similar effect, taking over routine tasks and pushing human artists towards work that machines cannot easily imitate.',
          },
          {
            id: '7',
            text: 'There are, however, real risks. Much of the material used to train these systems was created by artists who were neither asked for permission nor paid. And if the market is flooded with cheap machine-made images, the income on which many illustrators and designers depend may shrink. In my view, these are practical and legal problems rather than philosophical ones, and they deserve far more attention than the question of whether a computer can “really” be creative. That question may never be settled; the question of who benefits from the technology has to be answered now.',
          },
        ],
      },
      groups: [
        {
          id: 'r3-g1',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm1r-q27',
              number: 27,
              prompt: 'The writer mentions the sale of a portrait in the first paragraph in order to',
              options: [
                { id: 'A', text: 'show how valuable computer-made art has become.' },
                { id: 'B', text: 'introduce a question that the passage will explore.' },
                { id: 'C', text: 'criticise the people who bought the painting.' },
                { id: 'D', text: 'suggest that auction prices are unreliable.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The sale is used to raise the question “should we call the machine creative?”, which the rest of the passage discusses.',
                evidence: { paragraphId: '1', quote: 'should we call the machine creative?' },
                distractors: { A: 'The price is mentioned, but the writer’s purpose is the debate it started, not the value of such art.' },
              },
            },
            {
              id: 'm1r-q28',
              number: 28,
              prompt: 'According to the second paragraph, Boden’s definition of creativity',
              options: [
                { id: 'A', text: 'was designed to evaluate computer programs.' },
                { id: 'B', text: 'applies only to ideas that are new to all of human history.' },
                { id: 'C', text: 'includes ideas that are new only to the individual who has them.' },
                { id: 'D', text: 'has been rejected by most researchers.' },
              ],
              answer: { accepted: ['C'] },
              explanation: {
                text: 'Boden includes ideas “new only to the person who has them”, like a child working out a rule alone.',
                evidence: { paragraphId: '2', quote: 'ideas that are new only to the person who has them' },
                distractors: { B: 'This is only one of the two kinds she describes.' },
              },
            },
            {
              id: 'm1r-q29',
              number: 29,
              prompt: 'The writer refers to a move in the game of Go as an example of',
              options: [
                { id: 'A', text: 'a machine producing something unexpected.' },
                { id: 'B', text: 'an error that experts failed to notice.' },
                { id: 'C', text: 'the limitations of computer programs.' },
                { id: 'D', text: 'a machine judging the value of its own work.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'The move supports the point that computers can produce work that is “new and surprising”.',
                evidence: { paragraphId: '2', quote: 'some computer systems produce work that is new and surprising' },
                distractors: { B: 'Experts first thought it was a mistake, but it turned out to be brilliant, not an error.', D: 'The writer says people, not machines, judge value.' },
              },
            },
            {
              id: 'm1r-q30',
              number: 30,
              prompt: 'In the fourth paragraph, the writer compares the machine to a brush to suggest that',
              options: [
                { id: 'A', text: 'the software requires considerable skill to use.' },
                { id: 'B', text: 'the purpose behind the work comes from people.' },
                { id: 'C', text: 'the young artists had little involvement in the portrait.' },
                { id: 'D', text: 'computer-made images lack technical quality.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'A brush is a tool: the programmer or selector “supplies the intention”.',
                evidence: { paragraphId: '4', quote: 'who supplies the intention' },
                distractors: { C: 'The opposite: the artists chose which image to print, frame and sell.' },
              },
            },
          ],
        },
        {
          id: 'r3-g2',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm1r-q31',
              number: 31,
              prompt: 'The argument that computers only recombine existing material is less convincing than it seems.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'The writer says this argument “is weaker than it first appears”.', evidence: { paragraphId: '3', quote: 'This argument is weaker than it first appears.' } },
            },
            {
              id: 'm1r-q32',
              number: 32,
              prompt: 'Human artists learn in a fundamentally different way from computer systems.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says the difference is “one of degree rather than of kind”, i.e. not fundamental.', evidence: { paragraphId: '3', quote: 'The difference between people and machines here is one of degree rather than of kind.' } },
            },
            {
              id: 'm1r-q33',
              number: 33,
              prompt: 'The objection based on intention is stronger than the objection based on recombination.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'The second (intention) objection “is more persuasive”.', evidence: { paragraphId: '4', quote: 'The second objection is more persuasive.' } },
            },
            {
              id: 'm1r-q34',
              number: 34,
              prompt: 'Programs that evaluate their own work will soon be widely accepted by the public.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The writer calls the approach ingenious and doubts the program has its own aims, but makes no prediction about public acceptance.',
                evidence: { paragraphId: '5', quote: 'It is an ingenious approach' },
                distractors: { NO: 'Doubting whether the program has real aims is not the same as predicting that the public will reject it.' },
              },
            },
            {
              id: 'm1r-q35',
              number: 35,
              prompt: 'The invention of photography led to the disappearance of painting as a profession.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'Painters feared this, but “Instead” they began to experiment.', evidence: { paragraphId: '6', quote: 'some painters feared that their profession would disappear. Instead' } },
            },
          ],
        },
        {
          id: 'r3-g3',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'if it can explain and judge its own work.' },
            { id: 'B', text: 'to experiment rather than simply record what they saw.' },
            { id: 'C', text: 'towards work that is difficult for machines to imitate.' },
            { id: 'D', text: 'were never paid for its use.' },
            { id: 'E', text: 'more urgent than whether machines are truly creative.' },
            { id: 'F', text: 'impossible to answer without new laws.' },
            { id: 'G', text: 'to copy the style of earlier painters.' },
            { id: 'H', text: 'less important than the quality of the images.' },
          ],
          questions: [
            { id: 'm1r-q36', number: 36, prompt: 'The Lisbon research team believes software will be accepted as creative only', answer: { accepted: ['A'] }, explanation: { text: 'Accepted as creative “only if it can explain and judge its own work”.', evidence: { paragraphId: '5', quote: 'people will accept software as creative only if it can explain and judge its own work' } } },
            { id: 'm1r-q37', number: 37, prompt: 'The arrival of photography encouraged many painters', answer: { accepted: ['B'] }, explanation: { text: 'Freed from recording accurately, they experimented with colour, light and form.', evidence: { paragraphId: '6', quote: 'freed from the need to record faces and places accurately, many painters began to experiment' }, distractors: { G: 'Nothing is said about copying earlier painters.' } } },
            { id: 'm1r-q38', number: 38, prompt: 'The writer suggests that creative software may push human artists', answer: { accepted: ['C'] }, explanation: { text: 'Software may push artists towards work machines cannot easily imitate.', evidence: { paragraphId: '6', quote: 'pushing human artists towards work that machines cannot easily imitate' } } },
            { id: 'm1r-q39', number: 39, prompt: 'Many of the artists whose work was used to train these systems', answer: { accepted: ['D'] }, explanation: { text: 'They were “neither asked for permission nor paid”.', evidence: { paragraphId: '7', quote: 'artists who were neither asked for permission nor paid' } } },
            { id: 'm1r-q40', number: 40, prompt: 'The writer considers the question of who benefits from the technology to be', answer: { accepted: ['E'] }, explanation: { text: 'It “has to be answered now”, while the philosophical question may never be settled.', evidence: { paragraphId: '7', quote: 'the question of who benefits from the technology has to be answered now' }, distractors: { F: 'The writer calls them legal problems but never says new laws are required to answer the question.' } } },
          ],
        },
      ],
    },
  ],
};
