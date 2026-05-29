export type GuestOpinionQA = {
  question: string;
  answer: string[];
};

export type GuestOpinion = {
  slug: string;
  contributor: string;
  contributorRole: string;
  contributorLinkedIn?: string;
  intro?: string;
  questions: GuestOpinionQA[];
};

export const guestOpinions: Record<string, GuestOpinion[]> = {
  "03-how-the-industry-works": [
    {
      slug: "03-how-the-industry-works",
      contributor: "Capt. Pavlos Filippakis",
      contributorRole: "Master Mariner (Class 1)\nIce Class Captain",
      contributorLinkedIn: "https://www.linkedin.com/in/captain-pavlos/",
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
      contributorRole: "Master Mariner (Class 1)\nIce Class Captain",
      contributorLinkedIn: "https://www.linkedin.com/in/captain-pavlos/",
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
      contributorLinkedIn: "https://www.linkedin.com/in/erica-lay-4b0179292/",
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
      contributorRole: "Master Mariner (Class 1)\nIce Class Captain",
      contributorLinkedIn: "https://www.linkedin.com/in/captain-pavlos/",
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
    {
      slug: "07-operations",
      contributor: "Ollie Davis",
      contributorRole: "PIB Marine (formerly Zorab Insurance Services)",
      contributorLinkedIn: "https://www.linkedin.com/in/ollie-davis-43994392/",
      intro:
        "PIB Marine is the established UK specialist alternative to the multi-line yacht insurance brokers. We put five questions to Ollie Davis on the post-Bayesian market response, the 2022 to 2024 hardening cycle, the USD 500 million P&I limit, owner deductibles negotiable at quote stage, and war risk clauses since 2022. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "The post-Bayesian market response was selective tightening rather than blanket rate rises. Where exactly did underwriters tighten, and which clauses changed?",
          answer: [
            "From our experience with several large sailing yachts, we have not observed any significant increases in rating. In the case of Bayesian, although the hull is based on a design that has been produced multiple times by Perini, the rig is effectively a one-off within their range, making this hopefully an isolated incident.",
            "What we have seen, however, is an increase in underwriters' and insurers' requests for Risk Management Surveys. These are now being used to assess how crew procedures, training, and onboard management contribute to the safe day-to-day operation of the yacht. This represents a shift away from the more traditional focus on fire risk and watertight integrity alone.",
            "The direct underwriters and insurers involved in the tragedy — which we believe to include Travelers and British Marine — may have taken a more conservative view. Historically, one-off incidents of this nature have not had a noticeable impact on the yacht insurance market, compared to incidents affecting a larger number of clients or a particular model of yacht, as seen with the NTS losses and the Oyster Yachts incidents, where keels detached due to delamination at the hull-to-keel joint. Following the Oyster losses, some insurers declined to quote on multiple Oyster models because they could not be confident the problem would not recur.",
            "As the findings from the Bayesian incident continue to be published, if the designer, builder, or naval architect is ultimately found to be at fault, then potentially underwriters and insurers may reassess their appetite for other vessels they have designed or constructed previously.",
          ],
        },
        {
          question:
            "The hardening cycle in hull and machinery 2022 to 2024: what drove it, where has it landed, and what do you expect through 2026?",
          answer: [
            "We consider 2024 to have been the peak of the hardening cycle, driven largely by the pandemic and the onset of the war in Ukraine. These two events alone significantly increased the cost of yachting, due to a shortage of spare parts, increased repair costs, constraints on employment, and limited yard capacity for maintenance and refit work, particularly with larger Russian-owned yachts being \u201Cstuck\u201D in yards due to sanctions.",
            "During COVID, travel restrictions led to increased yacht purchases among those who could afford them, as yachts offered a practical way to self-isolate and work. With a reduction in new yachts being launched, second-hand yacht sales growing, cruising activity increasing, and yachts struggling to get into yards for maintenance periods or repair works, the insurance premiums also grew. There was also a large concern with many yachts being out in the Caribbean and Florida during the hurricane season as they were unable to return back to the Mediterranean, either due to lockdowns or lack of crew available. Insurers were concerned that they could see a repeat of the 2018 hurricane damage, particularly with so many yachts in the area, so they began to build up the premium \u201Cstockpile\u201D, should this happen again.",
            "At present, we are in a softer market and are seeing premiums slowly decrease following the recent hardening cycle. There is increased competitiveness in the brokerage market, with more yachts being remarketed at renewal. This naturally results, in most cases, in lower premiums. The downside is that, if an underwriter sees the same yacht presented for a few years consecutively, usually three or more times and by different brokers, then they can start declining to offer terms.",
            "Looking ahead through 2026, our expectation is that the insurance market will stabilise. Feedback from our markets is that premiums will be unchanged or with minimal increases applied in line with global inflation due to increasing claims costs. With the P&I Clubs, they continue to see more claims going over the USD 1 million limit, so they are keen to continue applying their usual 5 percent increases to their premiums.",
          ],
        },
        {
          question:
            "P&I for charter use: the USD 500 million third-party limit is now standard. What sits behind that figure, and how often is it seriously tested?",
          answer: [
            "As of now, at PIB Marine we have not had any experience of the now industry-standard USD 500 million limit being tested in practice — thankfully. One P&I club is even offering a USD 1 billion limit as standard now.",
            "Protection & Indemnity policies were originally developed for the commercial shipping industry, and P&I Clubs have a standard USD 500 million limit to align with the International Maritime Organisation (IMO) conventions and reinsurance limits. Thankfully, claims exceeding this limit are extremely rare, so the feeling is that this limit is a good balance between adequate catastrophic coverage and keeping the reinsurance premiums viable. For any amounts exceeding USD 500 million, the International Group of P&I Clubs can rely on their group pooling and reinsurance to handle these claims. The USD 500 million just acts as the initial primary layer.",
            "Looking at previous commercial shipping incidents that have led to substantial P&I claims, the most notable examples include the Costa Concordia loss and, more recently, the Baltimore Bridge accident. While the final claim settlements have not been officially published, it is widely understood that the Costa Concordia loss is expected to be in the region of USD 1.4 to 1.5 billion. The Baltimore Bridge loss is regarded as potentially the single largest marine insurance loss in history, at nearly USD 2.8 billion. By comparison, recent major yachting losses such as Bayesian are thought to be in the region of USD 150 million. Other scenarios where we might expect these higher limits to be tested include major damage to reefs and significant pollution incidents.",
            "It is also worth noting that, despite the availability of USD 500 million limits, some smaller vessels — while technically falling within this capacity — are offered reduced P&I limits by certain clubs, with premiums set at levels that better reflect the realistic exposure for a 25 to 35 metre yacht. In our experience, this approach has been welcomed by owners of vessels in this size range.",
          ],
        },
        {
          question:
            "Owner deductibles and warranty terms most owners do not negotiate well. Pick three that buyers should push back on at quote stage.",
          answer: [
            "Recently, we have pushed back on several deductible structures, particularly on yachts aged five years or older. We have seen a trend towards Actual Cash Value clauses for machinery, or increased engine deductibles being added to Hull & Machinery policies, as a way for insurers to mitigate potential risk for older yachts.",
            "Where yachts are well maintained by both crew and owners, supported by detailed maintenance logs, oil sample test results, and documented manufacturer inspections at the prescribed intervals, these measures can often be challenged. In many cases, underwriters are prepared to remove separate machinery deductibles, although this may sometimes result in a modest increase to the overall H&M deductible or the premium.",
            "Another area where we look to enhance cover, without increasing premium, is the inclusion of a No Claims Discount (NCD) at renewal the following year. Some insurers can offer this upfront but we don't normally advocate this, as it has to be repaid in the event of non-renewal or in the event of a claim. We do find clients are keen to take it out to reduce premiums initially but aren't so happy if they have to repay it.",
            "We have also seen a growing number of cases where vessels wish to tow tenders over longer passages, beyond their usual coastal cruising areas. Advances in technology — for example, systems from providers such as Yacht Trace — now offer sophisticated tender-towing solutions that enable improved monitoring and make extended towing more acceptable to underwriters. If an insurer's standard towing terms aren't suitable then we will always push back on them and ask if they can be modified.",
            "Similar to machinery deductibles, if a separate mast, spars, sails and rigging (MSSR) deductible is applied then this can sometimes be negotiated to improve terms for the owner. Many inner deductibles for things like fixtures and fittings, emergency towing, tenders and toys can be negotiated, and with personal effects, maximum limits for single items relating to both owner and crew personal effects may also be adjustable.",
            "In summary, most deductibles and warranties can usually be reviewed, negotiated, and adjusted to better reflect the vessel's actual risk profile.",
          ],
        },
        {
          question:
            "War risk clauses since 2022: how should a buyer think about the geographic exclusions and the additional premium structure?",
          answer: [
            "Ironically, War Risks cover does not provide cover for you while you are in designated War Risk areas, which is something that is often misunderstood. Instead, it is intended to cover the yacht whilst outside of high-risk areas for unexpected damage to your yacht arising from events such as riots, uprisings, or protests. A good example is the damage sustained by MY Kaos in Barcelona while alongside the dock, when the vessel was vandalised, and the failed Turkish coup in 2016. If a vessel were to enter a high-risk area, then we would need to discuss this with insurers and an additional premium would be due.",
            "The additional premium (AP) structure for cruising within War Risk exclusion zones is not fixed; it depends on several variables, including whether the vessel is a motor yacht or sailing yacht, maximum cruising speed, the vessel's profile and appearance, freeboard height, length of stay in the War Risk area, and captain and crew experience of the areas they are entering. These factors directly influence how the insurer assesses the risk of the yacht transiting or cruising through exclusion zones. It is common that, in addition to an AP being charged, increased deductibles can also apply while the vessel is in these areas. Typically, a 50 percent No Claims Discount on the AP is returned to the client following a successful passage or transit through the affected area.",
            "When planning a cruise in a high-risk area, insurers will normally require a separate Kidnap & Ransom (K&R) policy to be put in place, and armed guards provided by a separate security company will normally be needed on board. These will be an additional cost for the owner that would need to be factored in. Some insurers are happy to offer recommendations or have partnered with specialist security providers to offer additional support, which would be included within their additional premium.",
            "In light of the recent conflict in the Middle East and, before that, the war in Ukraine, we have seen insurers issue a seven-day notice of cancellation on all H&M and P&I policies in respect of certain cruising areas. This cover can usually be bought back from the insurer if the owner plans on visiting those areas, but this will involve an additional premium.",
          ],
        },
      ],
    },
  ],
  "08-motor-versus-sail": [
    {
      slug: "08-motor-versus-sail",
      contributor: "Ella Johnson",
      contributorRole: "Captain, 34m Baltic Yachts Performance Sloop",
      contributorLinkedIn: "https://www.linkedin.com/in/ella-johnson-26070634b/",
      intro:
        "We put four questions to Ella on sail at the top of the market: race week on a performance sloop, what she would specify differently with seven years' operational experience, a passage that stands for the case for sail, and what life onboard takes from a family new to it. Answers are given on the record, lightly edited for typography.",
      questions: [
        {
          question:
            "You raced a 35 metre Nautor Swan on the Maxi circuit earlier in your career. Walk us through a race week on that boat: what changed in the programme, who was on the rail, and what did the owner take from those seven days?",
          answer: [
            "My current owner does not race the boat — he is hesitant about the potential for someone getting hurt — but in my earlier career I raced against her on a 35 metre Nautor Swan. On that boat, we used to change the entire boat for racing.",
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
      contributorRole: "Master Mariner (Class 1)\nIce Class Captain",
      contributorLinkedIn: "https://www.linkedin.com/in/captain-pavlos/",
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
  "05-new-build-versus-brokerage": [
    {
      slug: "05-new-build-versus-brokerage",
      contributor: "Hein Velema",
      contributorRole:
        "Secretary General, Superyacht Alliance for Professional Standards; first president of SYBAss; former Feadship and Fraser",
      contributorLinkedIn: "https://www.linkedin.com/in/hein-velema-a4061aa6/",
      intro:
        "The Superyacht Alliance for Professional Standards administers the Yacht Owner's Representative Register (YORR) and oversees the Yacht Owner Representative Programme (YORP), the cross-industry course for owner's representatives. We put five questions to Hein Velema on the gap YORP was built to close, the curriculum, the verification process, the dual-role conflict, and yard selection beyond the big names. His answers are published as given, lightly edited for typography.",
      questions: [
        {
          question:
            "What was the specific gap that made YORP necessary, and where did the impetus come from?",
          answer: [
            "The programme came from a need expressed by the shipyards. They reported that some owner's representatives had no clear idea of what their role was, or what the yard expected of them. There are very good and very experienced owner's representatives in the industry, but the role itself did not have a clear definition. People came into the role from family offices, from law firms, from captaincy, and they figured the job out while doing it.",
            "The failure modes were ordinary. On smaller boats, some representatives did not know that the yacht had to be registered, or that it had to be prepared for operations. Some thought the role was signing off on change orders, or organising. It was not clear.",
            "The gap had real costs. Unclear roles led to projects running over time and over budget for the yards. They also damaged the owner's perception of the yard, because the representative in between could not communicate clearly who needed to do what. Shipyards prepare their clients to buy a second yacht with them, so a happy owner matters. The owner's representative plays a central part in that perception.",
            "The first work of the programme was to define the role; before any curriculum was written, we interviewed project managers at the yards, and we interviewed the owner's representatives those yards respected. The role definition came out of those conversations.",
          ],
        },
        {
          question:
            "Walk us through the curriculum. Four parts: what does each cover, and which one matters most in practice?",
          answer: [
            "The course is built in four parts.",
            "Understanding the shipyard comes first. To deal with the yard, to negotiate with it, you have to understand what they are doing, where their interests are, where their sensitivities sit. The representative is in between the owner and the yard, and when the yard says no, or becomes difficult, you need to understand where they are coming from. Bringing the two parties together is one of the things the representative is there to do.",
            "The second course is the representative's own job: responsibilities, the team you need around you, the discipline around progress and change orders, the preparation of the yacht for operations. The role contains something like twelve or thirteen specific tasks, and people often confuse one of them for the whole.",
            "Then the legal layer. Big money, big interests, written into contracts. The aim is to avoid conflict; if it arrives, the work is in managing it well.",
            "Last, and the part I would say matters most, is managerial leadership. Communication, negotiation, the skills that take a project to a good end. The technical and legal disciplines of the role can be taught; the leadership and the judgement carry the project.",
          ],
        },
        {
          question:
            "The register is designed to address inflated CVs. What does the verification process actually do, and how many applicants does it filter out?",
          answer: [
            "We did not delete all the inflated CVs. We are trying to contribute to clarity.",
            "The CV problem in the industry has a shape. People say: I built that boat. If the boat is anything bigger than an Optimist, nobody builds it on their own. Hundreds of people, sometimes thousands, are involved on a single new build. The honest question is what your part in it was.",
            "On the representative role specifically, people sometimes claim that they represented the owner on a new build when what they did was arrive seven months before delivery to prepare the boat for operations. That is an important part of the job, and we do not underestimate it. It is one of perhaps twelve or thirteen things you need to do. It is not the whole role.",
            "The register applies several filters. The application form asks for detail: not whether you were involved in a project, but in which parts of the owner's representation you were involved, what you were responsible for, who else was on the owner-side team. Some applicants ask for the documentation, see the form, and do not sign up. That is the first filter.",
            "The second is the reference. We ask for one, and we call it. Knowing that the reference will be called improves the accuracy of what people put on the form. There have been one or two cases where the reference described a different role than the form did. Some projects are downgraded: this is good experience and you learned from it, but you cannot claim you were the owner's representative on that project, because it was not your responsibility.",
          ],
        },
        {
          question:
            "The dual-role conflict, where major brokerages run technical departments while continuing to take yard commission. How does the YORR vetting handle that?",
          answer: [
            "The owner's representative and the broker are two different roles.",
            "One case the committee dealt with: a course graduate who was also an active broker. He had taken the course in good faith, and there was real value in his doing so. The committee, made up of owner's representatives with one SYBAss member, said it was a conflict of interest. He could not join the register while continuing to broker.",
            "I want to be careful with how that is read. I have managed brokers. I have trained brokers to sell new build. A broker can bring real added value to a new build project. If a broker has access to a client, that means he has value: it is difficult to get the ear of an owner, and where you have it, you have added value. The role is legitimate; the work is legitimate. It is a different role from the owner's representative role.",
            "The structural piece is the one that creates the friction. In a new build, the broker is often representing the owner in the deal, but the broker is being paid by the shipyard. That is a mismatch. Owners generally know that a broker works on commission. They do not always know how much, or on what.",
            "The code of conduct is more about behaviour than about knowledge. A knowledgeable and experienced representative who takes ten percent commission on the tender is a problem. We do not say it is forbidden. We say if you do it, you have to be completely transparent about it with the owner. In general, the position is that you do not.",
            "In the future, we may have a separate register for new build brokers. The role exists; it is real work; it warrants the same professionalisation the owner's representative role has been through.",
            "One line on the broker side. A broker does not own clients. That is not how this industry works. The work is the work, and the relationship is earned. Where that is clear, the broker's role in a new build can be a strong one.",
          ],
        },
        {
          question:
            "On selecting a yard beyond the big names. With the top-tier order books extending toward 2029, what should a first-time buyer be most alert to?",
          answer: [
            "The yard pricing test is the one I would start with.",
            "Some yards make offers that are just too low. The cost of building a yacht has direct costs and overhead. The overhead is not money the yard throws away; the overhead is what produces a quality boat. If you know one yard well, you know roughly what its profit margins look like, and they are typically not large. If another yard quotes fifteen percent below for a comparable build, with similarly thin margins, something is wrong. Brokers sometimes describe that quote as a great deal. The alarm bell should ring.",
            "The historical case is the one we sat through at the founding of SYBAss. New yards came into the market with very deep capital backing. They sold large hulls at prices the established yards knew were below cost. Some sold seven hulls before delivering the first. When the first was delivered, they realised they had underestimated. The eligibility rule that came out of that period was the SYBAss test: a yard needed to have delivered at least three boats over forty metres to join. Once you have delivered, you know what they cost.",
            "For a first-time buyer, the answer to the order-book question is not only wait or go brokerage. There are proper yards beyond the big names, in the Netherlands, in Italy, in Turkey, in Germany. Some are good. Some are not.",
            "What I would look at, in this order: have they delivered? What did they deliver? Is the boat you want similar in size to what they have built before? If you want fifty metres and the largest they have completed is thirty, you have questions. Do they have an order book at all? An empty shed is a different signal. The good yards beyond the big names know what they are doing, and their prices reflect that.",
          ],
        },
      ],
    },
    {
      slug: "05-new-build-versus-brokerage",
      contributor: "Jack Inglis",
      contributorRole: "Founder, ULTIMAR",
      contributorLinkedIn: "https://www.linkedin.com/in/philipjackinglis/",
      intro:
        "Jack Inglis is the founder of ULTIMAR and the practitioner whose 1,200-item delivery snag list anecdote is cited in the chapter above. We put five questions to him on what a snag list actually measures, how warranty looks on a well-managed build versus a poorly-managed one, what a proper construction contract should contain, the moments in a build when the broker's role gives way to the owner's representative's, and the one thing he would tell a first-time UHNW buyer in their first meeting. His answers are published as given, lightly edited for typography.",
      questions: [
        {
          question:
            "Walk us through the 1,200-item snag list project. What were the categories the family office CFO missed, and in what proportion?",
          answer: [
            "When I handed the snag list to the owner's representative (the CFO) at the time, they saw 1,200 liabilities. I saw something very different. A snag list is not a list of broken things; that is the mistake people make.",
            "Yes, a lot of it is cosmetic, between interior and exterior. But commissioning, integration, calibrations, flag and class items and bespoke owner items all get counted together, and they are not equal. You can have 300 cosmetic snags and sleep perfectly well, or you can have 15 critical commissioning issues and lose the first season.",
            "So the real issue is never the number. It is understanding the difference between quantity and consequence, and that is what was being missed. It is also important to understand that shipyards work to agreed contractual delivery criteria, and a yacht can still technically be delivered with a substantial snag list. The real objective is not simply reducing the number, but ensuring that the critical items affecting safety, operation and technical conformity are reduced to an acceptable level.",
          ],
        },
        {
          question:
            "You have said vessels poorly overseen during construction return to the yard for warranty work faster than they were delivered. What does the warranty period actually look like for a well-managed build versus a poorly-managed one, in real numbers?",
          answer: [
            "People often misunderstand warranty because they think it is simply a period of time on paper. It isn't. Every yacht will have warranty issues after delivery; that is normal. The real question is whether you are dealing with minor defects and operational bedding in, or whether the owner has effectively taken delivery of an unfinished yacht.",
            "A well managed build should allow for structured warranty works: small defects, adjustments, tweaks, and the odd operational issue that can be accounted for after delivery. Inconvenient, yes, but manageable.",
            "A poorly managed build is different. Warranty stops being warranty and starts feeling like an extension of construction, with repeated yard returns, unresolved defects, systems failures, crew frustration, and owners losing valuable use of the yacht. So the real measure is not whether a yacht has a two year warranty; it is how much of that period is spent enjoying the yacht versus fixing it.",
          ],
        },
        {
          question:
            "The 33-page Hill Robinson contract example for a 77 metre yacht: what should a properly drafted superyacht construction contract actually contain? Where should the document length come from?",
          answer: [
            "People get caught up on the size of a contract, but page count means very little on its own. What matters is whether the contract actually controls risk.",
            "At its core, a proper yacht construction contract should define what is being built, what happens if things change, how quality is measured, what constitutes acceptance, how delays are handled, and where responsibility sits when something goes wrong.",
            "But in reality, the real substance is rarely in the legal wording alone. It sits in the technical schedules behind it — specifications, criteria, protocols, milestones, procedures, conditions and acceptance standards — areas where most disputes begin. A solid contract creates the framework, and the technical detail gives the owner real clarity and protection.",
          ],
        },
        {
          question:
            "You operate independently. What are the specific moments in a build when the broker's technical department, even when capable, is structurally not the right party to lead?",
          answer: [
            "The best brokers today have to work far harder than people realise. They need commercial knowledge, technical understanding, market intelligence and often a very deep grasp of the realities behind ownership. That is part of being successful in today's market.",
            "The question is not capability. It is role alignment. A broker's role is to guide, advise and help navigate a transaction, and often far beyond that. But there are moments in a build where the owner needs someone whose role is solely focused on delivery, technical compliance, risk management and long term operational consequence, without any commercial gravity attached to the transaction itself. Between a broker and an owner's representative, they are different disciplines.",
            "The best projects usually happen when everyone brings their expertise to the table, with clear roles and alignment around the owner.",
          ],
        },
        {
          question:
            "If you were briefing a first-time UHNW buyer in their first meeting, what is the one thing you would tell them that no broker would say?",
          answer: [
            "A yacht is only the visible part. If you have a beautiful yacht but a bad ecosystem around it, it becomes an ugly yacht very quickly.",
            "Yacht ownership is not defined by the yacht. It is defined by the people, systems and infrastructure behind it. That is the part first-time buyers often do not see.",
          ],
        },
      ],
    },
  ],
};

export function getGuestOpinions(slug: string): GuestOpinion[] {
  return guestOpinions[slug] ?? [];
}
