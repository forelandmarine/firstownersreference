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
  "05-new-build-versus-brokerage": {
    slug: "05-new-build-versus-brokerage",
    contributor: "Hein Velema",
    contributorRole:
      "Secretary General, Superyacht Alliance for Professional Standards; first president of SYBAss; former Feadship and Fraser",
    intro:
      "The Superyacht Alliance for Professional Standards administers the Yacht Owner's Representative Register (YORR) and oversees YORP, the cross-industry training programme for owner's representatives. We put five questions to Hein Velema on the gap YORP was built to close, the curriculum, the verification process, the dual-role conflict, and yard selection beyond the big names. His answers are published as given, lightly edited for typography.",
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

  "07-operations": {
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
};

export function getGuestOpinion(slug: string): GuestOpinion | undefined {
  return guestOpinions[slug];
}
