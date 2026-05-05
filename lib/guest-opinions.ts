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

export const guestOpinions: Record<string, GuestOpinion> = {
  "07-operations": {
    slug: "07-operations",
    contributor: "Erica Lay",
    contributorRole: "Crew recruitment specialist, EL Crew Co",
    intro:
      "EL Crew Co operates from Mallorca and places senior and junior crew across the over-30 metre fleet. We put five questions to Erica Lay on the senior captain market, rotation, junior crew dynamics, retention, and the first-time owner's captain hire. Her answers are published as given, lightly edited for typography.",
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
};

export function getGuestOpinion(slug: string): GuestOpinion | undefined {
  return guestOpinions[slug];
}
