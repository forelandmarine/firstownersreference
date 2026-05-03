export type LeadEssay = {
  slug: string;
  title: string;
  standfirst: string;
  paragraphs: (string | { type: "h2"; text: string } | { type: "blockquote"; text: string; attribution?: string })[];
  readingTime: string;
};

export const leadEssays: Record<string, LeadEssay> = {
  "03-how-the-industry-works": {
    slug: "03-how-the-industry-works",
    title: "How the industry actually works",
    standfirst:
      "The superyacht market is one of the few luxury sectors in which the buyer routinely pays for the seller's adviser. This is the section nobody publishes a magazine about.",
    readingTime: "14 min read",
    paragraphs: [
      "The first thing a new owner learns, usually some months after the first contract is signed, is that the people they assumed were working on their behalf were not. The broker who walked them around shipyards in Viareggio and Vlissingen, who introduced them to the captain candidates, who recommended the law firm and the surveyor and the management company, was paid by the seller. In some transactions, the same broker also represented the seller. The owner did not know this because nobody told them, and they did not know to ask.",
      "This is not a scandal. It is the structure of the market. It has worked this way for half a century. The reason it persists is that the alternative, which is for the buyer to pay their own adviser at the rates such advice actually costs, feels expensive at the moment of the decision and only feels cheap years later, when the reader is on their second yacht and looking back at the first.",
      { type: "h2", text: "The commission stack" },
      "A typical brokerage sale of a 40-metre yacht for \u20ac28m moves roughly \u20ac2.8m in commissions. The headline number is 10 percent of the sale price, paid by the seller. In practice, that 10 percent splits in ways the buyer rarely sees. The seller's broker takes their share. The buyer's broker, if there is one, takes a share, paid not by the buyer but by the seller's broker out of the same commission pool. This creates the dual agency problem in its purest form. The buyer's adviser is paid only if the deal closes, and is paid by the other side.",
      "The yards have their own commission economy. New build sales generate referral fees that flow to whichever adviser steered the owner toward that particular yard. Some of these referrals are disclosed. Many are not. A management company that recommends a yard for a refit may be receiving a percentage of the refit invoice, paid quietly. A captain who recommends a paint contractor may be receiving a kickback the owner never sees. The sums are not small. On a \u20ac4m repaint, a 5 percent kickback is \u20ac200,000.",
      "We are not naming particular firms because the practice is industry-wide and most participants do not consider themselves dishonest. They consider themselves industry-standard. Which they are.",
      { type: "blockquote", text: "The buyer's adviser is paid only if the deal closes, and is paid by the other side. This is the dual agency problem in its purest form." },
      { type: "h2", text: "Why \"free\" costs the most" },
      "When a broker offers their services to a prospective buyer at no cost, the buyer is not getting free advice. They are getting advice paid for by the seller, structured to close the seller's deal. The broker may be a decent person who genuinely tries to find the right yacht for the buyer. The structure still bends every recommendation toward inventory the broker can earn on, every introduction toward counterparties who will reciprocate, and every piece of advice toward the closing of a transaction rather than the long-term interests of the buyer.",
      "An independent adviser, paid hourly or on a fixed fee by the buyer, has none of these incentives. They do not earn more if the deal closes. They earn the same if their advice is to walk away from a deal that should not happen. They earn the same whether the yacht costs \u20ac20m or \u20ac50m. The cost of an independent adviser on a typical first acquisition is somewhere between \u00a325,000 and \u00a3120,000, depending on scope. On a transaction worth tens of millions, this is a rounding error. Owners who economise on it tend to discover the cost in other ways.",
      { type: "h2", text: "The captain's loyalty problem" },
      "The captain is the highest-leverage hire an owner makes. They are also, often, the first hire. The captain is involved in the yacht selection, the survey, the sea trial, the recruitment of the rest of the crew, the choice of management company, the relationships with yards and contractors, and the day-to-day operating budget. They will likely be in post before the legal closing.",
      "The captain is also a human being with a career and a network. They have worked for other owners, for other yards, for other brokers. They have relationships that long pre-date the owner's involvement. Most captains are honest professionals who do their best for the owner who employs them. A small minority are not. The structure of the role provides ample opportunity for either, and the owner will struggle to tell which they have hired until well after the decision is made.",
      "A useful framework: the captain who tells you what you want to hear in the first three meetings is not the captain you want. The one who pushes back, who asks hard questions about your intended use, who is sceptical of your timeline, is the one to hire. Captains who agree easily are pleasant to work with and expensive to live with.",
      { type: "h2", text: "What independence actually means" },
      "Several firms describe themselves as independent. The word does meaningful work in some cases and is decorative in others. The independence test, which appears in full at the back of this Reference and which we apply to ourselves transparently in section eight, has six elements.",
      "One: does the firm earn anything contingent on a transaction closing? If yes, they are not independent of the deal. Two: does the firm hold any equity, employment, or referral relationship with any yard, broker, supplier, management company, or charter operation? If yes, they are not independent of those counterparties. Three: does the firm publish a complete list of every counterparty they have worked with in the past three years, with the nature of the relationship? If no, the reader cannot test claims one and two. Four: are the firm's fees transparent and quoted in writing in advance? If no, the structure can hide commissions. Five: does the firm hold professional indemnity insurance at a level appropriate to the transaction? If no, the firm cannot afford to be wrong on the buyer's behalf. Six: are the firm's principals named, traceable, and accountable? If no, none of the above can be verified.",
      "Six questions. Apply them to anyone you are considering. Apply them to us. We are confident in our answers and we publish them.",
      { type: "h2", text: "The honest version of the conversation" },
      "If you are reading this in advance of your first acquisition, the practical version of the above is this. Hire an independent adviser before you hire a broker. Hire your own lawyer rather than the broker's preferred counsel. Hire your own surveyor rather than the seller's. Pay all three from your own pocket and consider it the cheapest insurance you have ever bought. Treat any party who objects to this arrangement as having told you something useful about themselves.",
      "The industry will absorb your money no matter how many advisers you hire. The question is whether it absorbs your money on terms you understand and have chosen, or on terms you discover later. The Reference is written on the assumption that the first option is preferable.",
    ],
  },
};

export function getLeadEssay(slug: string): LeadEssay | undefined {
  return leadEssays[slug];
}
