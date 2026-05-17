export type GuestOpinionQA = {
  question: string;
  answer: string[];
};

export type GuestOpinion = {
  slug: string;
  contributor: string;
  contributorRole: string;
  intro?: string;
  questions: GuestOpinionQA[];
};

export const guestOpinions: Record<string, GuestOpinion[]> = {
  "03-how-the-industry-works": [
    {
      slug: "03-how-the-industry-works",
      contributor: "Capt. Pavlos Filippakis",
      contributorRole: "Master Mariner (Class 1)",
      intro:
        "Capt. Filippakis came to large-yacht command from a career in LNG and has led a complex refit and a subsequent pole-to-pole voyage on the owner-operated yacht he now commands. We put five questions to him on the captain's loyalty problem: the introduction route, the broker call, the referral-fee question, the disclosure rule, and the first conversation a first-time owner should have with a captain candidate. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "When you are introduced to an owner, who has typically already introduced you? Broker, prior captain, recruitment agency, family office? How does the introduction route shape what happens next?",
          answer: [
            "In my case, I had met the Owner randomly in person, and he was directly involved in operating his asset. It allowed a working — and personal — relationship to develop faster. The latter enhances loyalty.",
            "However, I believe the layer of external recruiters and management companies between hiring brings a lot of merit in this aspect, because it will make your Captain personally accountable to more parties.",
            "And with that layer usually comes a process that streamlines expectations for both sides and reduces the chance of a wrong hire. The heavy burden of carrying a reference from leading industry peers also plays a big part in how your Captain carries himself. It certainly does for me.",
          ],
        },
        {
          question:
            "Tell me about a time a broker called you with a charter request, a yacht acquisition referral, or a supplier introduction. What did the relationship look like before that call, and what was implied by the request?",
          answer: [
            "I've had both cold calls and acquaintances reaching out. It's a necessary part of a broker's life to source as many leads as possible, and I respect that.",
            "In the same way, it's a necessary part on the Captain's side to manage that without endangering the Owner's reputation, his own, or his contacts.",
            "Many times the requests are harmless — a simple introduction between acquaintances. Sometimes they come with caveats. Politely declining those without damaging the relationship is an art that each Captain has to master.",
          ],
        },
        {
          question:
            "Have you been offered a referral fee, finder's commission, or any other contingent payment by a broker, yard, supplier, management company, or recruitment agency? Without naming the firm, what was offered, and what did you do?",
          answer: [
            "It certainly has happened, and the fees would range widely.",
            "I've left a very lucrative career on LNG for the privilege of leading remote expeditions. My grandfather was also a Captain, and following Greek tradition, I carry his exact name — which carries a certain weight in how I perceive my reputation in this industry.",
            "And beyond that, I ask myself a simpler question: if you accept a fee for giving out the work, how can you still audit the quality of the result you are directly responsible for?",
            "You can't. So for me it's not really a question.",
          ],
        },
        {
          question:
            "The OnboardOnline legal column has stated the disclosure rule plainly: referral fees are legal only if disclosed. Is the disclosure rule observed in practice, or worked around?",
          answer: [
            "Personally, I've never seen referral fees in a contract, but I also have never been in a situation where referral fees had to be implemented.",
          ],
        },
        {
          question:
            "What would you tell a first-time owner to ask in the first conversation with a captain candidate to surface these incentives without making it adversarial?",
          answer: [
            "I think this is one of the most difficult assessments to make in a single conversation, and the truth is you cannot fully make it — you confirm or refute it over the first year. But there is one question that opens the right door without being adversarial:",
            "“Which brokers and yards do you have the strongest relationships with, and how did those relationships develop?”",
            "It's a fair question. Any captain operating at this level has them, and a confident captain will answer specifically — he'll name people, say how he came to know them, describe what each is good at.",
            "The candidate who goes vague, or who claims no strong relationships, is harder to read in a way that matters. Specificity is the tell. A captain who is comfortable being precise about his network is usually comfortable being precise about everything else, too — including what he chooses, and why.",
          ],
        },
      ],
    },
  ],
  "04-acquisition-process": [
    {
      slug: "04-acquisition-process",
      contributor: "Capt. Pavlos Filippakis",
      contributorRole: "Master Mariner (Class 1)",
      intro:
        "We put two questions to Capt. Filippakis on sea-trial discipline: what a competent captain is doing during the trial that a buyer would not see, and the failure modes he has personally found during sea trial that a survey did not catch. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "What does a competent captain do during a sea trial that a buyer would not see? What is the captain testing for that the surveyor is not?",
          answer: [
            "The surveyor tests whether the boat matches the specification. The captain tests whether she handles the way she'll need to handle at three in the morning, in weather, with a tired crew.",
            "I want to feel how she tracks at different speeds and sea states — does she hold a heading or fight the autopilot? Rapid load changes on the engines, not steady runs at trial RPM. Full astern from cruise. Hard-over to hard-over on the steering at load.",
            "Stabiliser response in real sea, not in port test mode. Bridge ergonomics — can a single OOW reach every alarm and override without leaving the console? What about vibration outside of critical RPM?",
            "Does the boat actually have an operational system in place, or is it just lying abandoned awaiting sale with the minimum amount of maintenance? You shouldn't start from zero when you purchase an older hull, unless that is priced in.",
            "The surveyor closes out a checklist. The captain is building a mental model of the boat he's about to be responsible for.",
          ],
        },
        {
          question:
            "Common failure modes you have personally found during sea trial that the survey did not catch?",
          answer: [
            "A few that recur:",
            "Swell from the bow up to 30 degrees each side would create a very uncomfortable motion due to the uncommon hull shape.",
            "Lack of soft starters that created a very distinct dimming effect to internal lighting whenever there was a heavy consumer coming online.",
            "Only a single sea chest supplying cooling water to the main engine. Essentially zero redundancy.",
            "Hydraulic stabilisers operating with incorrect nitrogen charge in the hydraulic accumulators — generates severe hydraulic noise in zero-speed mode that renders the system unusable with guests onboard. Passes every static pressure check. You only find it when you actually anchor somewhere and run it.",
            "Bow thruster thermal cut-outs set for cold trial water — fine in northern Europe, nuisance trips in August Mediterranean. To reset the trip a person had to travel to the forecastle.",
            "Excessive soot when starting generators required a person to climb on the mast and physically cap the exhausts.",
            "Main engine would require a two-hour starting process to bring the lube oil to temperature from cold condition.",
            "Fire pump had a common DC motor with the lube oil pump and would increase the main engine oil pressure whenever it was put in operation. Fire pump was also providing cooling water to one of the thrusters.",
            "Both generators together couldn't supply full hotel load with both thrusters running simultaneously.",
            "Autopilot directly connected to the steering system, without a separate FU or NFU system. If the single autopilot unit failed (e.g. a blown fuse) you had to revert to emergency steering.",
            "Emergency generators not starting automatically — permitted under grandfather rules, but operationally unacceptable.",
            "Negligible rudder effect when going astern unless at speeds over 2.5 knots.",
            "Lack of a stern-to gangway, essentially forcing the vessel to berth only alongside — fewer options at higher cost.",
            "Tender retrieval that required five to six hands on deck on a slight beam swell.",
            "Multiple other items that could bar the vessel from attaining commercial registration in the future.",
          ],
        },
      ],
    },
  ],
  "07-operations": [
    {
      slug: "07-operations",
      contributor: "Erica Lay",
      contributorRole: "Crew recruitment specialist, EL Crew Co",
      intro:
        "EL Crew Co operates from Mallorca and places senior and junior crew across the over-24 metre fleet. We put five questions to Erica Lay on the senior captain market, rotation, junior crew dynamics, retention, and the first-time owner's captain hire. Her answers are published as given, lightly edited for typography.",
      questions: [
        {
          question:
            "The senior crew market in 2026: where is it tightest, and what are owners realistically paying above guide rates to secure a captain at 50 to 70 metres?",
          answer: [
            "The tightest part of the market is experienced, proven captains in the 50 to 70 metre range who can do more than just drive the yacht. Owners are no longer just hiring for tickets and sea time, they want leadership, commercial awareness, crew management, charter understanding, and increasingly: emotional intelligence.",
            "That combination is rare, and it is where the pressure sits.",
            "In real terms, owners are paying above guide rates not just in salary, but in overall package. Salary uplift alone can be anywhere from €1,500 to €4,000 per month above traditional benchmarks depending on the programme, but more importantly, they are using rotation, bonuses, and improved leave structures to secure and retain the right person.",
            "The captains who can run a smooth programme, keep crew turnover low, and manage owner expectation effectively are commanding a premium. The days of \u201Cthere\u2019s plenty more where that came from\u201D at this level are gone.",
          ],
        },
        {
          question:
            "Time-for-time rotation is now 63 percent of the 70 to 79 metre captain bracket, per Quay Crew. What is the recruitment-side reality of operating a yacht without rotation in 2026? Can it still be done?",
          answer: [
            "It can still be done, but the pool of candidates willing to accept it is shrinking fast.",
            "The reality is that most experienced senior crew now expect rotation as standard, particularly on busy programmes. Without it, you are either hiring someone stepping up, someone between roles, or someone willing to compromise for a specific reason, whether that\u2019s location, programme type, or a short-term plan.",
            "That is not necessarily a bad hire, but it does change the risk profile.",
            "From a recruitment perspective, non-rotational roles take longer to fill, attract a narrower and often less experienced pool, and typically come with a shorter shelf life in terms of retention. You may fill the role, but you are far more likely to be replacing that crew member within 12 to 18 months.",
            "Owners need to understand that rotation is no longer a perk. In many cases, it is the price of entry to access the top end of the market, and to get the very best from their crew, consistently.",
          ],
        },
        {
          question:
            "Junior crew pay has plateaued while senior continues to rise. What is happening at the bottom of the pyramid, and what does that mean for owners building a crew over the next three years?",
          answer: [
            "At the very junior end, supply still outweighs demand. There is a steady flow of new entrants into the industry, particularly on the deck side, and that has kept salaries relatively flat.",
            "However, that does not mean junior crew are \u201Ccheap\u201D or easily retained.",
            "What we are seeing is a growing disconnect between expectation and reality. Social media has created a perception of fast progression and high earnings, which is not always matched by the day-to-day reality of the job. As a result, junior crew are quicker to move on if the environment, leadership, or onboard culture does not meet their expectations.",
            "For owners building a crew, this means the focus should not be on shaving costs at the junior level. The real cost comes from turnover, retraining, and disruption.",
            "Over the next three years, yachts that invest in proper onboarding, clear progression pathways, and strong onboard leadership will retain their junior crew and reduce long-term costs. Those that treat junior crew as easily replaceable will continue to see churn.",
          ],
        },
        {
          question:
            "Retention is the variable cost most owners do not manage well. What is the single most common cultural or structural failure you see that drives turnover on a yacht?",
          answer: [
            "Inconsistency from the top.",
            "That can come from the owner, the captain, or the management structure, but it shows up in the same way. Changing expectations, unclear boundaries, lack of communication, or a mismatch between what was promised and what is delivered onboard.",
            "Crew can handle hard work. They can handle long hours and demanding programmes. What they struggle with is unpredictability and a lack of trust in leadership.",
            "If the culture shifts depending on who is onboard, if rules are applied unevenly, or if decisions feel reactive rather than considered, crew will start looking elsewhere.",
            "The yachts that retain crew well tend to have one thing in common. Clear, consistent leadership, open communication, and a culture that does not change overnight.",
          ],
        },
        {
          question:
            "The first-time owner approaching their first crew build. What is the one piece of advice you would give them about hiring the captain that brokers and management companies typically do not?",
          answer: [
            "Do not just hire the best captain on paper. Hire the one who can manage you.",
            "That is the part that is rarely said out loud.",
            "A technically strong captain with an impressive CV is not enough if they cannot manage the owner relationship. The best captains understand how to set boundaries, communicate clearly, and guide a first-time owner through decisions they have never had to make before.",
            "If you get that hire wrong, everything else becomes harder. Crew turnover increases, the onboard culture suffers, and the programme becomes reactive instead of enjoyable.",
            "A good captain runs the yacht. A great captain manages the entire ecosystem around it, including the owner.",
            "That is the hire that will define your experience. And also, check references, not just from other owners and managers. Dig deeper, and talk to the crew who\u2019ve worked under their leadership.",
          ],
        },
      ],
    },
    {
      slug: "07-operations",
      contributor: "Capt. Pavlos Filippakis",
      contributorRole: "Master Mariner (Class 1)",
      intro:
        "We put five questions to Capt. Filippakis on captain hire and crew dynamics: what separates a good captain from a competent one, where to push back in interview, the cost of rotation that the salary line does not show, what compounds crew turnover, and the single most consequential operational discipline of year one. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "What separates a good captain from a competent average one in your view, beyond CV depth?",
          answer: [
            "Giving credit to his crew while taking the stand for their errors. Willing to improve. Being conversant about each department of the vessel while not micromanaging his subordinates. Humility. Humour. Protocol.",
          ],
        },
        {
          question:
            "The chapter argues the captain to hire is the candidate who pushes back hardest in interview, not the one who agrees easily. Is that your experience? What did you push back on, and how was it received?",
          answer: [
            "In my case I didn't even have to interview — I was offered the opportunity to manage a very complex refit and the subsequent pole-to-pole voyage on the spot, based on a gut feeling from the Owner.",
            "That said, the one I would push back on is micromanagement. A Captain needs to have the ability to make significant decisions on the fly — having the freedom to do so, within of course the pre-agreed parameters, makes a world of difference in how fast problems are solved in the field.",
            "Realistic manning for the actual operating profile, contingency budgets for remote work, a small raise for a crew member we cannot afford to lose. A Captain has to reduce the operating risk profile of his vessel and fighting for that is part of the job.",
          ],
        },
        {
          question:
            "Quay Crew records 63 percent of captains on time-for-time rotation. What changed? What does rotation cost the owner that the salary line does not show?",
          answer: [
            "I consider rotation a good thing for this industry. While it's not easy to rotate as a Captain — you have to agree to follow a common line of command — having a management team in place that oversees standardisation makes it work.",
            "The cost the salary line doesn't show is the friction between two operating philosophies. Two captains will have slightly different standards on documentation, on crew discipline, on what gets escalated. Without active management, you get drift, and crew quietly optimise for whichever captain is onboard. That corrodes the operation over time.",
            "However, if it works, especially for dual season or explorer yachts, rotation can be one of the most important factors, if not the most important, for the retention of a Captain.",
          ],
        },
        {
          question:
            "Crew turnover is described as compounding. What turns it on, what turns it off, and what does an owner control versus what they delegate?",
          answer: [
            "Crew turnover is directly related to the culture onboard. The Owner usually controls the appointment of the persons who can make or break that environment (mostly Captain, Chef, Chief Stew). If they create a toxic atmosphere of fear, no respect for safety or standard working conditions, salaries or leave become a second consideration.",
            "He also controls the crewing budget. While salaries must be according to the industry, small things — investing in a loyal deckhand's training to become an officer, accepting an extended leave on compassionate grounds — act as multipliers, because they are directly related to how the crew view the Owner. And that is also the reason why, in my opinion, any feedback the Owner has for his operation is best to pass through the Captain first, as a means to implement that without damaging the Owner's status.",
            "Crew also need to know what is expected of them. That is something that is delegated to the management or to the Captain and his team; the more vague an operation is without any formal structure, the easier for crew to feel disappointed. And lastly planning and managing the guests' expectations is another essential aspect that is related to crew turnover, as if the trips are not successful, it strains morale.",
          ],
        },
        {
          question:
            "If you were advising a first-time owner on the single most consequential operational discipline of year one, what would it be?",
          answer: [
            "Document everything.",
            "Not just maintenance logs — everything. Defects found, decisions made, conversations with contractors, crew complaints raised and resolved, cost estimates versus actuals.",
            "This will create a baseline and also show you that a structure is in place that in turn will put your mind at ease without feeling the need to micromanage your asset.",
          ],
        },
      ],
    },
  ],
  "08-motor-versus-sail": [
    {
      slug: "08-motor-versus-sail",
      contributor: "Capt. Ella Johnson",
      contributorRole:
        "Master of a 34 metre Baltic Yachts performance sloop",
      intro:
        "We put four questions to Capt. Johnson on sail at the top of the market: race week on a performance sloop, what she would specify differently with seven years' operational experience, a passage that stands for the case for sail, and what life onboard takes from a family new to it. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "You raced a 35 metre Nautor Swan on the Maxi circuit earlier in your career. Walk us through a race week on that boat: what changed in the programme, who was on the rail, and what did the owner take from those seven days?",
          answer: [
            "My current owner does not race the boat — he is hesitant about the potential for someone getting hurt — but in my younger career I raced against her on a 35 metre Nautor Swan. On that boat, we used to change the entire boat for racing.",
            "We would change the back stays to running back stays and the mainsail to a square top, and all the halyards and sheets to lighter weight race ropes. We would empty lockers and change all the floorboards inside the boat. We used to bring in a race boss who organised the crew and assigned positions.",
            "The owner loved the racing, and for me it was the highlight of sailing superyachts. I miss it greatly.",
          ],
        },
        {
          question:
            "Your current boat — a 34 metre Baltic Yachts performance sloop — launched in 2019. What was specified at build that you would still recommend today, and what would you change with the benefit of seven years' operational experience?",
          answer: [
            "She is a beautiful boat — well built, fast, and she looks the same seven years on. That is a testament to both the yard's design and build and the crew over the years who have looked after her.",
            "Change-wise, it very much depends on how the owners use her. For me, the aft winches and sail trim buttons are the worst part of the boat — only because they're behind the pedestals, so you can't always see what you're trimming.",
          ],
        },
        {
          question:
            "Take a passage you remember. Where were you, what were the conditions, and what is the moment from it that you would describe to a first-time owner weighing sail against motor?",
          answer: [
            "We were sailing from Antigua to the Mediterranean. The first three days out of Antigua are warm, the stars are beautiful at night, and we're sailing at 15 knots. As we near the Azores it gets colder, windier, and we have 3 metre waves. That doesn't sound like much, but it feels big out in the ocean.",
            "We have the mainsail reefed and the J4 out. We're surfing waves doing 20 knots, dolphins jumping out around us. There's a thrill in that which you would never get on a motorboat.",
          ],
        },
        {
          question:
            "A family new to sailing. Which parts of life on board take hold immediately, and which arrive only with time?",
          answer: [
            "If you've never sailed before, the sea legs take a couple of days to get used to, and as an owner, the lack of closet space could be cause for concern to some.",
            "The rest comes naturally — and you'll love every minute of it.",
          ],
        },
      ],
    },
    {
      slug: "08-motor-versus-sail",
      contributor: "Capt. Pavlos Filippakis",
      contributorRole: "Master Mariner (Class 1)",
      intro:
        "We put three questions to Capt. Filippakis on the explorer and high-latitude angle: how the segment compares operationally with a conventional 50 metre Mediterranean motor programme, what Polar Code-certified operation actually requires of owner, crew, and build, and the honest case versus the romantic mistake for a first-time UHNW buyer attracted to the explorer profile. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "The Damen Yacht Support range and the SeaXplorer line are reportedly booked through Q4 2028 / Q1 2029 on certain models. Operationally, how does this segment compare with a conventional 50 metre Mediterranean motor programme?",
          answer: [
            "Same hull length on paper, nothing else in common.",
            "A 50m Mediterranean motor yacht runs on hospitality logic — marina to marina, full shoreside support, weather windows are convenient rather than critical, spares hours away by road. Aesthetics are usually a very important factor.",
            "An explorer runs on self-sufficiency logic. Operating envelopes measured in weeks at sea. Crews weighted toward operational skills — ice, advanced maintenance, helicopter ops, heavy-weather tender work — rather than service skills. Redundancy and onboard capabilities are what define a true explorer. Things like additional crew cabins to accommodate local guides, more deck space to store the additional capabilities, and custom-built equipment to allow for that additional space without sacrificing guest areas are some of the considerations that go in an explorer build.",
            "The other difference is that explorer programmes are mission-led. You're running a Northwest Passage transit, an Antarctic season, a Raja Ampat expedition. Different requirements for each mission, that might even require the use of a support vessel. So it's very important to define the requirements early on.",
          ],
        },
        {
          question:
            "What does Polar Code-certified operation actually require of the owner, the crew, and the build, that a Mediterranean-only programme does not?",
          answer: [
            "Polar Code splits into Categories A, B, C depending on ice conditions, and the requirements stack. However, compliance with the regulations represents only the minimum requirements.",
            "Build. Polar Ship Certificate, vessel-specific Polar Water Operational Manual, ice strengthening, cold-rated equipment, lifesaving for five days of group survival rather than twenty-four hours, high-latitude comms, stability assessed with topside icing.",
            "Crew. STCW polar amendments — basic or advanced ice navigation for Master, Chief Mate, OOWs, depending on category. Practical hours matter more than classroom ones. Ice Pilot or at least a local guide is a necessity for most areas. ISM contingency planning based on remote operations.",
            "Owner. Specialised insurance, assistance from expedition companies like EYOS, individual permit regimes (Antarctic Treaty system, Sysselmesteren in Svalbard, Canadian and Russian Arctic frameworks), ice pilot and local guide fees, potentially much more expensive and complicated port calls with provisions having to be flown in, crew rotation from ports that might have a single flight per week (e.g. Stanley), and the acceptance that the operating season is short and the weather is sovereign.",
            "None of this transfers from a Mediterranean programme. Polar capability is a different vessel category from the keel up.",
          ],
        },
        {
          question:
            "For a first-time UHNW buyer attracted to the explorer profile, what is the honest case and what is the romantic mistake?",
          answer: [
            "The honest case is real, and part of it is something the spreadsheets miss — every serious boat builds a story over her lifetime, and an explorer builds the kind of story that lasts. Keel laid at Vlissingen, first ice in Greenland, summer in Svalbard, the season she got stuck somewhere she shouldn't have been and the crew that got her out. That legend becomes the boat's identity, it follows her through every change of ownership, and it's the reason a well-known explorer with a real logbook will always find her next owner. A motor yacht in Antibes has a guest list. An explorer has a history.",
            "Beyond the romance, the operational case stands on its own. A genuine explorer gives you a self-sufficient cruising envelope no marina-based boat can match — Antarctica, the high Arctic, Raja Ampat, Patagonia — with helicopter integration on most builds. The buyer pool is small but committed, so well-maintained explorers with a real story hold value reasonably well.",
            "The romantic mistake is buying the boat without buying the programme.",
            "An explorer parked in Antibes ten months a year is a very expensive way to own a normal motor yacht with a worse layout for entertaining. There is a build premium over a comparable conventional, with operating costs to match — paid for capability you're not using. And worse, she never builds her legend.",
          ],
        },
      ],
    },
  ],
};

export function getGuestOpinions(slug: string): GuestOpinion[] {
  return guestOpinions[slug] ?? [];
}
