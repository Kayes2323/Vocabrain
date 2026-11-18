import type { ObjectiveSection } from '../../model';

/**
 * Mino Academic Mock Test 2 — Reading. Three original passages written
 * for Mino at IELTS Academic level (40 questions, 60 minutes).
 * Not Cambridge material.
 */
export const mock2Reading: ObjectiveSection = {
  skill: 'reading',
  timeLimitMinutes: 60,
  parts: [
    // ------------------------------------------------------------- Passage 1
    {
      id: 'r1',
      number: 1,
      passage: {
        title: 'The Tree That Wears a Removable Coat',
        paragraphs: [
          {
            id: '1',
            text: 'Walk through the countryside of southern Portugal or western Spain and you may notice trees that look oddly undressed. Their trunks are smooth and reddish-brown, as if someone has peeled away a thick coat, and in fact someone has. These are cork oaks, and the missing coat has been removed on purpose. Unlike almost every other tree, the cork oak can lose its outer bark without being harmed, and it simply grows a new layer to replace it. This unusual ability has supported rural communities around the western Mediterranean for centuries.',
          },
          {
            id: '2',
            text: 'The bark of the cork oak is unlike that of other trees. It is made up of millions of tiny cells filled with air and coated in a waxy substance called suberin. This structure makes cork extremely light and springy, and it is almost impossible for water or gas to pass through it. Cork also resists fire, which is probably why the tree evolved such a thick covering. Wildfires are common in the Mediterranean summer, and a cork oak with a thick layer of bark can survive a blaze that would kill many other trees, because the living tissue beneath is protected from the heat. After a fire, the tree sprouts new growth from its trunk.',
          },
          {
            id: '3',
            text: 'Harvesting cork is a skilled task that has changed little over the generations. A tree must be about twenty-five years old before it can be stripped for the first time, and the rough, uneven cork it yields, known as virgin cork, is unsuitable for bottle stoppers. It is ground up and used for flooring and insulation instead. The tree is then left alone for roughly nine years while a new layer forms. The second harvest produces better material, but only from the third harvest onwards is the cork smooth and uniform enough to be cut into stoppers. The work is done in summer, because that is when the bark separates most easily from the trunk. It is done entirely by hand: workers use a special axe to cut through the bark and then lever it away in large curved sheets, taking great care not to damage the living layer underneath. Once a tree has been harvested, the last digit of the year is painted on its trunk in white, so that nobody returns too soon.',
          },
          {
            id: '4',
            text: 'A healthy cork oak can be harvested many times. Because the first stripping takes place at about twenty-five years and the tree may live for around two hundred years, a single tree can supply cork for well over a century. Landowners therefore treat their cork oaks as a long-term investment, something to be passed from one generation to the next rather than sold quickly for profit.',
          },
          {
            id: '5',
            text: 'Cork has a long history. The ancient Romans made fishing floats and sandals from it, and they also used it to seal clay jars of wine and oil. For many centuries afterwards, however, wine was stored mainly in barrels, and cork played only a minor part. The change came in the eighteenth century, when glassmakers began to produce bottles of a consistent shape and size. A cork stopper could be squeezed into the neck of such a bottle and would then expand to form a tight seal, which allowed wine to be stored on its side and to improve with age. Within a few decades, the cork stopper had become standard across much of Europe.',
          },
          {
            id: '6',
            text: 'The cork forests are valuable in other ways. The open woodlands, known as montado in Portugal and dehesa in Spain, are among the richest habitats in Europe. Farmers graze pigs, sheep and cattle beneath the trees, while the woodlands shelter rare animals such as the Iberian lynx. Researchers also believe that harvested trees absorb more carbon dioxide than unharvested ones, because they must grow a new layer of bark. Estimates of the effect vary, but it is thought to be significant.',
          },
          {
            id: '7',
            text: 'The future of the cork industry is uncertain. In recent decades, many wine producers have switched to plastic stoppers and metal screw caps, which are cheaper and avoid the small risk that natural cork will spoil the wine. If demand falls far enough, landowners may decide that the trees are no longer worth keeping and clear the land for other uses. Climate change adds to the pressure, since longer droughts weaken the trees and leave them more open to disease. Conservation groups argue that the best way to protect cork woodlands is to ensure that people continue to buy cork products, an unusual case in which consumption helps to protect nature rather than harm it.',
          },
        ],
      },
      groups: [
        {
          id: 'm2r-g1',
          type: 'sentence-completion',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          questions: [
            {
              id: 'm2r-q1',
              number: 1,
              prompt: 'The bark of the cork oak consists of millions of tiny cells filled with ___.',
              answer: { accepted: ['air'] },
              explanation: { text: 'The cells that make up cork are filled with air.', evidence: { paragraphId: '2', quote: 'millions of tiny cells filled with air' } },
            },
            {
              id: 'm2r-q2',
              number: 2,
              prompt: 'Virgin cork is ground up and used for flooring and ___.',
              answer: { accepted: ['insulation'] },
              explanation: { text: 'Because virgin cork is unsuitable for stoppers, it is used for flooring and insulation.', evidence: { paragraphId: '3', quote: 'used for flooring and insulation instead' } },
            },
            {
              id: 'm2r-q3',
              number: 3,
              prompt: 'Workers cut through the bark with a special ___.',
              answer: { accepted: ['axe'] },
              explanation: { text: 'The tool used to cut the bark is a special axe.', evidence: { paragraphId: '3', quote: 'workers use a special axe to cut through the bark' } },
            },
            {
              id: 'm2r-q4',
              number: 4,
              prompt: 'Cork is harvested in ___ because the bark comes away from the trunk most easily at that time.',
              answer: { accepted: ['summer'] },
              explanation: { text: 'The work is done in summer, when the bark separates most easily.', evidence: { paragraphId: '3', quote: 'The work is done in summer, because that is when the bark separates most easily from the trunk' } },
            },
            {
              id: 'm2r-q5',
              number: 5,
              prompt: 'The ancient Romans used cork to make fishing floats and ___.',
              answer: { accepted: ['sandals'] },
              explanation: { text: 'The Romans made fishing floats and sandals from cork.', evidence: { paragraphId: '5', quote: 'made fishing floats and sandals from it' } },
            },
          ],
        },
        {
          id: 'm2r-g2',
          type: 'true-false-not-given',
          instructions:
            'Do the following statements agree with the information given in Reading Passage 1? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
          questions: [
            {
              id: 'm2r-q6',
              number: 6,
              prompt: 'A cork oak is killed if its outer bark is removed.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The tree is not harmed and grows a new layer of bark.', evidence: { paragraphId: '1', quote: 'the cork oak can lose its outer bark without being harmed' } },
            },
            {
              id: 'm2r-q7',
              number: 7,
              prompt: 'The thick bark of the cork oak helps the tree to survive wildfires.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'A thick layer of bark protects the living tissue from the heat of a fire.', evidence: { paragraphId: '2', quote: 'a cork oak with a thick layer of bark can survive a blaze that would kill many other trees' } },
            },
            {
              id: 'm2r-q8',
              number: 8,
              prompt: 'Cork from the second harvest is of better quality than virgin cork.',
              answer: { accepted: ['TRUE'] },
              explanation: { text: 'The second harvest gives better material than the first, which yields virgin cork.', evidence: { paragraphId: '3', quote: 'The second harvest produces better material' } },
            },
            {
              id: 'm2r-q9',
              number: 9,
              prompt: 'Cork is now stripped from the trunks mainly by machine.',
              answer: { accepted: ['FALSE'] },
              explanation: { text: 'The passage says the work is done entirely by hand and has changed little.', evidence: { paragraphId: '3', quote: 'It is done entirely by hand' } },
            },
            {
              id: 'm2r-q10',
              number: 10,
              prompt: 'Cork oaks that are harvested live for a shorter time than those that are left alone.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The passage gives the possible lifespan of a cork oak but never compares harvested and unharvested trees.',
                evidence: { paragraphId: '4', quote: 'the tree may live for around two hundred years' },
                distractors: { FALSE: 'A long lifespan is mentioned, but nothing is said about unharvested trees living longer.' },
              },
            },
          ],
        },
        {
          id: 'm2r-g3',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm2r-q11',
              number: 11,
              prompt: 'According to paragraph 5, cork stoppers became standard for wine bottles because',
              options: [
                { id: 'A', text: 'the Romans had already shown that cork could seal liquids.' },
                { id: 'B', text: 'bottles of a consistent shape and size became available.' },
                { id: 'C', text: 'wine producers wanted to stop storing wine in barrels.' },
                { id: 'D', text: 'cork was cheaper than the materials used before.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Stoppers spread once glassmakers produced bottles of consistent shape and size.',
                evidence: { paragraphId: '5', quote: 'when glassmakers began to produce bottles of a consistent shape and size' },
                distractors: { A: 'The Romans sealed clay jars, but this is not given as the reason for the later change.', C: 'Barrels are mentioned only as the earlier method of storage.' },
              },
            },
            {
              id: 'm2r-q12',
              number: 12,
              prompt: 'What point does the writer make about the cork woodlands in paragraph 6?',
              options: [
                { id: 'A', text: 'They are grazed mainly by rare animals.' },
                { id: 'B', text: 'They support both farming and wildlife.' },
                { id: 'C', text: 'They absorb more carbon dioxide than any other woodland.' },
                { id: 'D', text: 'They are the largest habitats in Europe.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Farmers graze animals beneath the trees and the woodlands also shelter rare species.',
                evidence: { paragraphId: '6', quote: 'Farmers graze pigs, sheep and cattle beneath the trees, while the woodlands shelter rare animals' },
                distractors: { C: 'Harvested trees are said to absorb more carbon than unharvested ones, not more than all other woodland.', D: 'They are described as among the richest habitats, not the largest.' },
              },
            },
            {
              id: 'm2r-q13',
              number: 13,
              prompt: 'What do conservation groups believe about the future of cork woodlands?',
              options: [
                { id: 'A', text: 'They are threatened mainly by disease.' },
                { id: 'B', text: 'They will survive only if people keep buying cork.' },
                { id: 'C', text: 'They should be replaced by plastic production.' },
                { id: 'D', text: 'They need more money from wine producers.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'Conservationists say the best protection is continued demand for cork products.',
                evidence: { paragraphId: '7', quote: 'the best way to protect cork woodlands is to ensure that people continue to buy cork products' },
                distractors: { A: 'Disease is mentioned only as one effect of climate change, not as the main threat.' },
              },
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
        title: 'Streets for People',
        subtitle: 'Some cities are redesigning their roads so that drivers, cyclists and pedestrians share the same space.',
        paragraphs: [
          {
            id: 'A',
            labelled: true,
            text: 'For most of the twentieth century, the design of city streets followed a single principle: keep traffic moving. Roads were widened, pedestrians were confined to narrow pavements and fenced in at crossings, and signs, signals and painted lines told every user exactly where to go and when. Streets where children had once played became corridors for vehicles. The result was efficient for motorists but often unpleasant for everyone else. In recent decades, however, a number of cities have begun to question this approach, and some have set out to reverse it by redesigning streets so that they can be shared by people on foot, on bicycles and in vehicles.',
          },
          {
            id: 'B',
            labelled: true,
            text: 'The idea has its roots in the Netherlands in the 1970s, where residential streets were rebuilt as places for living rather than simply for travelling. These streets, known as woonerven, had no raised kerbs between road and pavement; instead, they were given bends, trees, benches and play areas that forced drivers to move at little more than walking pace. The concept soon spread to other European countries, and local residents were often closely involved in choosing where the trees and benches should go. Later, planners applied a bolder version of it to busy town centres under the name “shared space”, removing traffic lights, road markings and most signs so that drivers, cyclists and pedestrians would have to find their way through by making eye contact with one another.',
          },
          {
            id: 'C',
            labelled: true,
            text: 'It sounds like a recipe for accidents, yet many schemes report the opposite. The explanation most often offered is that conventional streets teach drivers to relax: when the rules are clear, they assume that others will obey them and pay less attention to what is actually happening around them. In a shared space, nobody can be certain what will happen next, and so drivers slow down and look more carefully. Researchers who have compared streets before and after redesign usually find fewer serious injuries, although the number of minor collisions sometimes stays the same. They remain cautious, however, because most schemes are small and local conditions differ so much that the results are hard to compare.',
          },
          {
            id: 'D',
            labelled: true,
            text: 'Business owners often oppose such schemes, fearing that removing parking spaces will drive customers away. Yet surveys of shoppers in several cities suggest that traders consistently overestimate how many of their customers arrive by car. Many more come on foot or by public transport, and these visitors tend to stop more often, even if they spend less each time. After streets in some towns were redesigned, the number of people passing shop doors rose, and some retailers reported that trade increased. The evidence is not all one-sided, however: shops that depend on deliveries, or on customers who buy bulky goods, have sometimes suffered.',
          },
          {
            id: 'E',
            labelled: true,
            text: 'A more serious criticism comes from organisations representing blind and partially sighted people. For someone who cannot see, a kerb is an essential signal that the pavement has ended and the road has begun, and a controlled crossing that gives a sound or a vibration tells them when it is safe to cross. Remove both, these groups argue, and the street becomes a place that they cannot navigate independently. Some councils have responded by installing textured paving and marked crossing zones, but designers admit that these compromises weaken the original principle, since drivers are once again being told where pedestrians are expected to be.',
          },
          {
            id: 'F',
            labelled: true,
            text: 'The effects of shared streets may reach well beyond traffic. When it feels safe to walk or cycle, more people do so, and even short daily journeys on foot add up to a meaningful amount of exercise. Quieter streets also mean less noise and cleaner air. Perhaps more surprising are the social effects. In one study of two similar streets in an English city, residents of the street with little through traffic reported knowing considerably more of their neighbours, and their children were far more likely to play outside. Researchers suggest that when a street stops being merely a route, people begin to treat it as a place. Such studies cannot prove, however, that the street design alone was responsible, since families who choose to live on quiet streets may already be more sociable.',
          },
          {
            id: 'G',
            labelled: true,
            text: 'None of this means that shared streets are suitable everywhere. Closing one road can push traffic onto neighbouring ones, and emergency vehicles need clear access, as do the delivery lorries on which local businesses depend. Others have discovered that a design which works well in a compact town centre fails on a long, busy road. Several cities that introduced schemes without consulting residents have faced such strong protest that the changes were reversed within a few years. Successful projects, planners now agree, begin not with a drawing but with a conversation about what a particular street is for, and who it is for.',
          },
        ],
      },
      groups: [
        {
          id: 'm2r-g4',
          type: 'matching-headings',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for paragraphs B–F from the list of headings below.',
          optionsTitle: 'List of Headings',
          options: [
            { id: 'i', text: 'Shopkeepers’ fears and the evidence' },
            { id: 'ii', text: 'The cost of rebuilding the roads' },
            { id: 'iii', text: 'A design that began in one country and spread' },
            { id: 'iv', text: 'Wider effects on health and community' },
            { id: 'v', text: 'How drivers were taught to obey the rules' },
            { id: 'vi', text: 'Why uncertainty can make roads safer' },
            { id: 'vii', text: 'Who is left out?' },
            { id: 'viii', text: 'Cities that have abandoned the idea' },
          ],
          questions: [
            {
              id: 'm2r-q14',
              number: 14,
              prompt: 'Paragraph B',
              answer: { accepted: ['iii'] },
              explanation: { text: 'The paragraph traces the idea from its Dutch origins to other countries and then to town centres.', evidence: { paragraphId: 'B', quote: 'The idea has its roots in the Netherlands in the 1970s' } },
            },
            {
              id: 'm2r-q15',
              number: 15,
              prompt: 'Paragraph C',
              answer: { accepted: ['vi'] },
              explanation: { text: 'The paragraph explains that drivers take more care when they cannot be sure what will happen.', evidence: { paragraphId: 'C', quote: 'In a shared space, nobody can be certain what will happen next' }, distractors: { v: 'The paragraph says clear rules make drivers careless, not that drivers are taught the rules.' } },
            },
            {
              id: 'm2r-q16',
              number: 16,
              prompt: 'Paragraph D',
              answer: { accepted: ['i'] },
              explanation: { text: 'Traders fear a loss of customers, but surveys suggest they overestimate how many arrive by car.', evidence: { paragraphId: 'D', quote: 'fearing that removing parking spaces will drive customers away' } },
            },
            {
              id: 'm2r-q17',
              number: 17,
              prompt: 'Paragraph E',
              answer: { accepted: ['vii'] },
              explanation: { text: 'The paragraph is about blind and partially sighted people, who lose the signals they rely on.', evidence: { paragraphId: 'E', quote: 'A more serious criticism comes from organisations representing blind and partially sighted people.' } },
            },
            {
              id: 'm2r-q18',
              number: 18,
              prompt: 'Paragraph F',
              answer: { accepted: ['iv'] },
              explanation: { text: 'The paragraph covers exercise, noise, air quality and neighbourly contact.', evidence: { paragraphId: 'F', quote: 'When it feels safe to walk or cycle, more people do so' }, distractors: { ii: 'Cost is not discussed in this paragraph.' } },
            },
          ],
        },
        {
          id: 'm2r-g5',
          type: 'table-completion',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimit: { words: 1 },
          table: {
            headers: ['Group', 'Concern', 'What the evidence or response shows'],
            rows: [
              ['Shop owners', 'Taking away {{19}} spaces will drive customers away', 'Customers who arrive on foot or by public transport visit shops more {{20}}'],
              ['Blind and partially sighted people', 'Without {{21}} they cannot tell where the pavement ends', 'Some councils have added textured {{22}} and marked crossing zones'],
            ],
          },
          questions: [
            { id: 'm2r-q19', number: 19, answer: { accepted: ['parking'] }, explanation: { text: 'Owners fear that removing parking spaces will drive customers away.', evidence: { paragraphId: 'D', quote: 'removing parking spaces will drive customers away' } } },
            { id: 'm2r-q20', number: 20, answer: { accepted: ['often'] }, explanation: { text: 'Visitors on foot or by public transport tend to stop more often.', evidence: { paragraphId: 'D', quote: 'these visitors tend to stop more often' } } },
            { id: 'm2r-q21', number: 21, answer: { accepted: ['kerb(s)'] }, explanation: { text: 'A kerb signals where the pavement ends and the road begins.', evidence: { paragraphId: 'E', quote: 'a kerb is an essential signal that the pavement has ended and the road has begun' } } },
            { id: 'm2r-q22', number: 22, answer: { accepted: ['paving'] }, explanation: { text: 'Some councils have installed textured paving.', evidence: { paragraphId: 'E', quote: 'installing textured paving and marked crossing zones' } } },
          ],
        },
        {
          id: 'm2r-g6',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO of the following are given in paragraph C as reasons why shared spaces may reduce serious injuries?',
          choose: 2,
          options: [
            { id: 'A', text: 'Drivers cannot predict how other road users will behave.' },
            { id: 'B', text: 'Barriers keep pedestrians away from vehicles.' },
            { id: 'C', text: 'Drivers look more carefully at what is happening around them.' },
            { id: 'D', text: 'Traffic is banned from the street at busy times.' },
            { id: 'E', text: 'The police enforce speed limits more strictly.' },
          ],
          questions: [
            { id: 'm2r-q23', number: 23, answer: { accepted: ['A'] }, explanation: { text: 'In a shared space nobody can be sure what will happen next.', evidence: { paragraphId: 'C', quote: 'nobody can be certain what will happen next' } } },
            { id: 'm2r-q24', number: 24, answer: { accepted: ['C'] }, explanation: { text: 'Drivers slow down and look more carefully.', evidence: { paragraphId: 'C', quote: 'drivers slow down and look more carefully' }, distractors: { B: 'Fencing is mentioned only in the old, conventional design in paragraph A.' } } },
          ],
        },
        {
          id: 'm2r-g7',
          type: 'multiple-choice-multi',
          instructions: 'Choose TWO letters, A–E.',
          stem: 'Which TWO problems with shared streets are mentioned in paragraph G?',
          choose: 2,
          options: [
            { id: 'A', text: 'Traffic may be pushed onto nearby roads.' },
            { id: 'B', text: 'Cyclists may collide with pedestrians.' },
            { id: 'C', text: 'Rents on the street may rise.' },
            { id: 'D', text: 'Emergency vehicles must be able to reach the street.' },
            { id: 'E', text: 'Drivers may refuse to share the road.' },
          ],
          questions: [
            { id: 'm2r-q25', number: 25, answer: { accepted: ['A'] }, explanation: { text: 'Closing one road can send traffic to neighbouring roads.', evidence: { paragraphId: 'G', quote: 'Closing one road can push traffic onto neighbouring ones' } } },
            { id: 'm2r-q26', number: 26, answer: { accepted: ['D'] }, explanation: { text: 'Emergency vehicles need clear access.', evidence: { paragraphId: 'G', quote: 'emergency vehicles need clear access' } } },
          ],
        },
      ],
    },
    // ------------------------------------------------------------- Passage 3
    {
      id: 'r3',
      number: 3,
      passage: {
        title: 'The Trouble with Prizes',
        paragraphs: [
          {
            id: '1',
            text: 'Every few years, a school or a government announces a scheme to pay pupils for good results. The logic seems unanswerable: people work harder when they are rewarded, so why should learning be any different? Supporters of such schemes tend to be impatient with those who raise objections, and the objectors, in turn, often dismiss the supporters as naive. I want to argue that the matter is more complicated than either side admits, and that the important question is not whether rewards work, but what exactly they work on. Both camps rest their case on assumptions that are seldom examined.',
          },
          {
            id: '2',
            text: 'Psychologists distinguish between intrinsic motivation, the desire to do something for its own sake, and extrinsic motivation, the desire to gain a reward or avoid a penalty. Early researchers assumed that the two simply added up: a child who enjoyed reading and was also offered a prize would read more than a child with only one of these reasons. A body of later experiments suggested otherwise. In a typical study, children who already enjoyed drawing were promised a prize for doing so; when the prize was later withdrawn, they drew less than children who had never been offered one. The proposed explanation, sometimes called the overjustification effect, is that the reward changes how the activity is understood: what was play becomes work done for payment.',
          },
          {
            id: '3',
            text: 'Enthusiasts for incentives are quick to point out the limits of these studies. Most involved young children and tasks that were enjoyable to begin with, whereas many pupils find school work dull, so there is little intrinsic interest to be undermined. Nor is it clear that an effect found in a laboratory over a few weeks would persist over several years. Critics of incentives, in my view, sometimes treat a finding about one kind of task as if it were a law about all human motivation.',
          },
          {
            id: '4',
            text: 'Large field trials of cash incentives have produced mixed results. Rewards offered for specific, easily controlled actions, such as attending lessons or handing in homework, tend to bring modest improvements in those actions. Rewards offered for outcomes such as examination scores have been far less effective, and in several trials had no measurable effect. One plausible explanation is that many pupils do not know how to turn effort into better results; a prize cannot help a pupil who has no idea how to revise. Money, in other words, can motivate but it cannot teach. The pattern is consistent enough to be taken seriously, although the trials differ greatly in design and in the size of the payments involved.',
          },
          {
            id: '5',
            text: 'A further difficulty is that incentives encourage people to concentrate on whatever is measured. Some studies suggest that when teachers are rewarded for test scores, they spend more time on test preparation at the expense of subjects that are not tested. Similar distortions may arise among pupils: if the prize depends on a grade, the rational strategy is to find the easiest route to that grade, which is not necessarily the route that leads to the deepest understanding. It is worth noting that none of this requires dishonesty; it is simply what sensible people do when the target changes.',
          },
          {
            id: '6',
            text: 'Fairness is another concern. Households with little money may find even a small payment attractive, which is why some advocates see incentives as a tool for helping disadvantaged pupils. Opponents reply that paying children for what ought to be a normal part of growing up sends a damaging message about why education matters. I have some sympathy with this view, but an ethical objection carries weight only if the alternative works. Refusing to pay when payments would help the pupils who are furthest behind has costs of its own.',
          },
          {
            id: '7',
            text: 'Drawing these threads together, I believe that the sensible position is neither enthusiasm nor rejection. Rewards seem most defensible when they are small, offered for behaviours rather than results, and designed as a temporary scaffold to help a pupil get started, in the hope that genuine interest will grow in its place. Teachers have long used praise, stickers and privileges in much the same spirit, and nobody calls that corruption.',
          },
          {
            id: '8',
            text: 'Yet it would be a mistake to treat money as the real issue. Studies of schools that succeed in motivating their pupils tend to find the same features: tasks pitched at the right level of difficulty, feedback that is prompt and specific, and a sense that the pupil has some control over what is learnt. These cost little, and they work with intrinsic motivation instead of competing against it. Such measures are less eye-catching than a cheque, which may explain why they are discussed less often. A school that has to pay its pupils to turn up might first ask what is wrong with what it offers once they arrive.',
          },
        ],
      },
      groups: [
        {
          id: 'm2r-g8',
          type: 'yes-no-not-given',
          instructions:
            'Do the following statements agree with the claims of the writer in Reading Passage 3? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, NOT GIVEN if it is impossible to say what the writer thinks about this.',
          questions: [
            {
              id: 'm2r-q27',
              number: 27,
              prompt: 'Supporters of reward schemes are often impatient with their critics.',
              answer: { accepted: ['YES'] },
              explanation: { text: 'The writer says supporters tend to be impatient with those who object.', evidence: { paragraphId: '1', quote: 'Supporters of such schemes tend to be impatient with those who raise objections' } },
            },
            {
              id: 'm2r-q28',
              number: 28,
              prompt: 'Early researchers expected intrinsic and extrinsic motivation to combine to produce more effort.',
              answer: { accepted: ['YES'] },
              explanation: { text: '“Simply added up” paraphrases “combine to produce more effort”.', evidence: { paragraphId: '2', quote: 'Early researchers assumed that the two simply added up' } },
            },
            {
              id: 'm2r-q29',
              number: 29,
              prompt: 'The writer believes that findings about children who enjoy drawing apply equally to every kind of task.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer says it is a mistake to treat a finding about one kind of task as a law about all motivation.', evidence: { paragraphId: '3', quote: 'sometimes treat a finding about one kind of task as if it were a law about all human motivation' } },
            },
            {
              id: 'm2r-q30',
              number: 30,
              prompt: 'Teachers who are rewarded for test scores usually resent the system.',
              answer: { accepted: ['NOT GIVEN'] },
              explanation: {
                text: 'The writer discusses how such rewards change what teachers do, but says nothing about how teachers feel.',
                evidence: { paragraphId: '5', quote: 'when teachers are rewarded for test scores' },
                distractors: { YES: 'The passage describes a change in teaching time, not resentment.' },
              },
            },
            {
              id: 'm2r-q31',
              number: 31,
              prompt: 'The writer thinks it is wrong to use payments to help disadvantaged pupils.',
              answer: { accepted: ['NO'] },
              explanation: { text: 'The writer understands the ethical objection but says refusing to pay has costs of its own.', evidence: { paragraphId: '6', quote: 'Refusing to pay when payments would help the pupils who are furthest behind has costs of its own.' } },
            },
          ],
        },
        {
          id: 'm2r-g9',
          type: 'multiple-choice',
          instructions: 'Choose the correct letter, A, B, C or D.',
          questions: [
            {
              id: 'm2r-q32',
              number: 32,
              prompt: 'What do the experiments described in paragraph 2 suggest about rewards?',
              options: [
                { id: 'A', text: 'Children dislike being observed while they draw.' },
                { id: 'B', text: 'A reward can change how an enjoyable activity is perceived.' },
                { id: 'C', text: 'Prizes should be withdrawn gradually rather than all at once.' },
                { id: 'D', text: 'Children who draw more improve more quickly.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The proposed explanation is that a reward turns play into work done for payment.',
                evidence: { paragraphId: '2', quote: 'what was play becomes work done for payment' },
                distractors: { C: 'Gradual withdrawal is not discussed.' },
              },
            },
            {
              id: 'm2r-q33',
              number: 33,
              prompt: 'Why does the writer mention that many pupils find school work dull?',
              options: [
                { id: 'A', text: 'To suggest that intrinsic motivation may be weak in school anyway.' },
                { id: 'B', text: 'To argue that reward schemes should be abolished.' },
                { id: 'C', text: 'To prove that the laboratory studies were wrong.' },
                { id: 'D', text: 'To show that younger pupils work harder than older ones.' },
              ],
              answer: { accepted: ['A'] },
              explanation: {
                text: 'If school work is dull, there is little intrinsic interest for a reward to undermine.',
                evidence: { paragraphId: '3', quote: 'there is little intrinsic interest to be undermined' },
                distractors: { C: 'The writer reports a limit of the studies; he does not say they were wrong.' },
              },
            },
            {
              id: 'm2r-q34',
              number: 34,
              prompt: 'According to the writer, why might rewards for examination scores have little effect?',
              options: [
                { id: 'A', text: 'Pupils do not value the money on offer.' },
                { id: 'B', text: 'Pupils may not know how to improve their results.' },
                { id: 'C', text: 'The examinations are too difficult for most pupils.' },
                { id: 'D', text: 'The prizes are usually too small to matter.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'A prize cannot help a pupil who does not know how to turn effort into better results.',
                evidence: { paragraphId: '4', quote: 'many pupils do not know how to turn effort into better results' },
              },
            },
            {
              id: 'm2r-q35',
              number: 35,
              prompt: 'Which of the following best summarises the writer’s view of incentives?',
              options: [
                { id: 'A', text: 'They should be banned from schools.' },
                { id: 'B', text: 'They are acceptable if they are limited and temporary.' },
                { id: 'C', text: 'They work best for older pupils.' },
                { id: 'D', text: 'They should replace praise and privileges.' },
              ],
              answer: { accepted: ['B'] },
              explanation: {
                text: 'The writer defends small rewards that act as a temporary scaffold.',
                evidence: { paragraphId: '7', quote: 'designed as a temporary scaffold to help a pupil get started' },
                distractors: { D: 'Praise and privileges are described as similar in spirit, not as something to be replaced.' },
              },
            },
          ],
        },
        {
          id: 'm2r-g10',
          type: 'matching-sentence-endings',
          instructions: 'Complete each sentence with the correct ending, A–H.',
          optionsTitle: 'List of Endings',
          options: [
            { id: 'A', text: 'drew less than children who had not been rewarded.' },
            { id: 'B', text: 'treat a finding about one kind of task as true of all motivation.' },
            { id: 'C', text: 'tend to bring modest improvements in those actions.' },
            { id: 'D', text: 'look for the easiest route to the grade rather than the deepest understanding.' },
            { id: 'E', text: 'prompt, specific feedback and some control over what they learn.' },
            { id: 'F', text: 'larger payments than other schools offer.' },
            { id: 'G', text: 'tasks that are as difficult as possible.' },
            { id: 'H', text: 'more time on the subjects that are tested.' },
          ],
          questions: [
            { id: 'm2r-q36', number: 36, prompt: 'When the prize in the drawing experiment was withdrawn, the children who had been offered it', answer: { accepted: ['A'] }, explanation: { text: 'They drew less than children who had never been offered a prize.', evidence: { paragraphId: '2', quote: 'they drew less than children who had never been offered one' } } },
            { id: 'm2r-q37', number: 37, prompt: 'The writer says that critics of incentives sometimes', answer: { accepted: ['B'] }, explanation: { text: 'They generalise from one kind of task to all human motivation.', evidence: { paragraphId: '3', quote: 'sometimes treat a finding about one kind of task as if it were a law about all human motivation' } } },
            { id: 'm2r-q38', number: 38, prompt: 'Rewards for easily controlled actions such as attending lessons', answer: { accepted: ['C'] }, explanation: { text: 'Such rewards bring modest improvements in those actions.', evidence: { paragraphId: '4', quote: 'tend to bring modest improvements in those actions' } } },
            { id: 'm2r-q39', number: 39, prompt: 'If a prize depends on a grade, a rational pupil may', answer: { accepted: ['D'] }, explanation: { text: 'The rational strategy is to find the easiest route to the grade.', evidence: { paragraphId: '5', quote: 'the rational strategy is to find the easiest route to that grade' }, distractors: { H: 'This describes what some teachers do, not pupils.' } } },
            { id: 'm2r-q40', number: 40, prompt: 'Schools that succeed in motivating pupils tend to give them', answer: { accepted: ['E'] }, explanation: { text: 'Such schools offer prompt, specific feedback and a sense of control over what is learnt.', evidence: { paragraphId: '8', quote: 'feedback that is prompt and specific, and a sense that the pupil has some control over what is learnt' }, distractors: { F: 'The writer says these features cost little.' } } },
          ],
        },
      ],
    },
  ],
};
