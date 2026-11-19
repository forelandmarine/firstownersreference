# Cyber, navigation integrity and payment security: research note

19 November 2026. Prepared for the editors ahead of a possible chapter 07 section and a guest contribution from Diego Zanco (DeepBlue). Nothing here is in the published text yet. Items marked UNVERIFIED need a primary check before print.

## 1. Where the subject sits in the book

No chapter currently covers cyber, GNSS interference or payment fraud. The only reference is the one-line note in `docs/2027-study/A-ch01-ch07-costs-crew-insurance.md` section 3.10. Proposed placement:

- Chapter 07 Operations: a new section, provisionally "Connectivity, cyber and navigation", after compliance and before insurance, since it bridges the two (ISM cyber requirement on one side, the CL380 cyber exclusion on the other).
- Chapter 04 Acquisition: one paragraph and a checklist line on verifying payment instructions for deposits and closing funds.
- Chapter 07 checklist: four or five lines (below).
- Glossary: GNSS, spoofing, jamming, business email compromise, CL380, IACS UR E26/E27, multi-factor authentication.

Press close is mid-December 2026, so this needs a decision this week if it goes in the 1st Edition. Otherwise it suits the April 2027 digital supplement.

## 2. Findings

### 2.1 Connectivity changed the exposure

- Low-earth-orbit service (Starlink) has put yachts permanently online. A chief engineer quoted by Insurance Business (11 Aug 2026) puts monthly connectivity cost at tens of thousands of dollars for limited VSAT traffic before, a few thousand for unlimited Starlink now. A 99.9% SLA connection for 1 to 2 TB a month on a mid-sized yacht costs about $1,000 to $2,000 a month (Matthew Geyman, Intersys).
- Weak points named in the same piece: guest Wi-Fi bridged to vessel networks; NMEA 2000 and CAN bus navigation and propulsion networks with no built-in security; crew handed every password on paper; permanent remote access left in place by third-party suppliers, reaching propulsion, lighting and CCTV; high crew turnover.
- Breaches are rarely disclosed by owners, so there is no reliable incident rate for yachts. The book should say so rather than quote vendor statistics.

### 2.2 Documented incidents in the yacht sector

- Lürssen, Bremen: ransomware over Easter 2023 stopped large parts of yard operations; criminal investigation opened. (Robb Report, The Record.)
- MarineMax: cyber incident disclosed to the SEC, no material impact reported. Year UNVERIFIED (believed March 2024).
- Captain's email phishing (OmniAccess case study, undated, yacht unnamed): session token stolen, hidden mail rules set, two transfers totalling $100,000 made through the yacht's payment application. Same password on email and the payment app; no MFA. Vendor case study, so treat as illustrative.
- ITIC broker case (reported July 2025): a broker paying charter hire received an email from an address one character different from the owner's, announcing new bank details. Paid €58,000 to the fraudster without phoning to confirm. ITIC reimbursed. In a separate €90,000 case the bank stopped the payment, which ITIC describes as rare.
- Sale-deposit diversion: brokers and buyers have had escrow payments redirected after the email thread between them was taken over; discovered only when funds did not arrive in escrow. (Trade blog sources; no named case.)

### 2.3 Payment and identity fraud, now with AI

- Business email compromise remains the main loss route. FBI IC3: 24,768 BEC complaints in 2025, over $3bn reported losses. UNVERIFIED against the IC3 2025 report.
- Deepfake impersonation: the Arup Hong Kong case (early 2024), an employee paid about $25m after a video call with a deepfaked CFO and colleagues. Verify against FT or Arup's own statement before citing.
- Family office surveys report high concern about deepfake impersonation of principals; figures conflict between sources and should not be quoted.
- The yacht payment chain has many points where a changed bank account is plausible: yard stage payments, refit invoices, fuel, agents, crew agencies, charter hire, brokerage deposits and closing funds. Each is a routine payment to a party the payer rarely speaks to.

Controls that recur across ITIC, insurers and the incident write-ups:

1. Any change of bank details is confirmed by phone to a number already on file, never one in the request.
2. Closing and deposit wiring instructions are confirmed in advance by the lawyer or escrow agent, by phone.
3. Two people approve payments above a set threshold; the captain alone does not.
4. Separate passwords and multi-factor authentication on email, banking and the management software.
5. Urgency and secrecy in a payment request are treated as warning signs, including a request apparently from the owner.

### 2.4 Owner privacy and location exposure

- AIS, tracking sites, crew social media and corporate registers combine into a detailed picture of an owner's movements. Several sources treat crew posting as the most common leak.
- Standard measures: crew contract clauses on itineraries, guests and the owner's identity; one point of contact for media; private personal accounts. A Chambers article discusses where AIS data becomes personal data under GDPR.
- Most sources here sell security services. Keep the treatment short and practical.

### 2.5 GNSS jamming and spoofing

- Baltic: Lithuanian regulator count of spoofing antennae in Kaliningrad rose from 3 to 36 by May 2026 (Reuters via secondary source; verify). Yachting World (March 2026) reports interference and shadowing affecting cruising yachts.
- Eastern Mediterranean: still among the most active zones in mid-2026 (Ramsey Faragher, RIN, in Yachting Monthly, June 2026).
- Gulf and Red Sea: JMIC advisories in March 2026 described interference in the Strait of Hormuz as "widespread and consistent", easing to "localized and sporadic" by 24 March; GNSS "highly likely to be unreliable" and radar and visual navigation advised. Ties into the open Iran war treatment decision (2027 study README section 9).
- Faragher: GNSS interference caused two groundings and one collision in 2025 with costs near $100m (commercial shipping). He describes it as a safety and cyber issue more than a navigation one, because AIS, DSC, EPIRB and MOB systems all take position from GNSS; a distress alert can send rescuers to the wrong place.
- Practical response: check gpsjam.org or gpswise.aero before passage; cross-check against radar overlaid on the chart (coastline offset is the classic sign); a second GNSS receiver is no check; know which onboard systems depend on GNSS; Galileo OSNMA authentication and CRPA antennas are emerging options.
- No dataset of confirmed yacht incidents exists. Sources are commercial-shipping data plus yachting press.

### 2.6 AI on board and local models

- Builders are now offering onboard AI. Next Yacht Group (Next AI-Integrated System, with AI Technologies and YES Group) is marketed as local-first: processing on board, connectivity optional for read-only remote access. Rossinavi has Rossinavi AI on Seawolf X with Videoworks. Claims are the builders' own.
- The case for local models is privacy: guest conversations, owner preferences, crew HR and medical records, and financial data stay on a server on board rather than with a cloud provider. The case is real, but "local" is not the same as private. Model downloads and updates, cloud fallback, web-search tools, logging, telemetry and an inference server reachable over the network are each a separate path out. On a yacht the satellite link and supplier remote access are the obvious ones.
- The more immediate risk is ordinary: crew pasting owner, guest or financial details into public chatbots. A written rule on what goes into which tool costs nothing.
- AI also helps attackers: faster vulnerability discovery, better phishing, voice and video impersonation.

### 2.7 Regulation

- IMO Resolution MSC.428(98): cyber risk must be addressed in the safety management system from the first annual DOC audit after 1 January 2021. Reaches yachts operating under ISM (commercially registered, 500 GT and over), and Foreland's own voluntary ISM clients if the SMS adopts it.
- IACS UR E26 (ship) and E27 (systems): ships contracted for construction on or after 1 July 2024. The Rev.1 text lists "pleasure yachts not engaged in trade" in its scope; ABS states mandatory application to cargo ships of 500 GT and over and passenger ships on international voyages, with URs as guidance for other types. The exact position for classed yachts must be checked with class (Lloyd's Register, DNV, ABS, RINA, BV) before print. Practical consequence either way: a 500 GT commercial yacht contracted after mid-2024 is now delivered with a cyber resilience file, and buyers of new builds should ask for it.
- Red Ensign Yacht Code: no cyber-specific provisions found. UNVERIFIED.
- Insurance: Institute Cyber Attack Exclusion Clause CL380 (2003) excludes cyber loss from hull and P&I unless written back; owners need a buy-back or standalone marine cyber cover. Fits the existing ch07 insurance section and James Drysdale (Howden).

## 3. Diego Zanco (DeepBlue) as contributor

DeepBlue (Deep Blue Soft Monaco SARL) is yacht management software with Planned Maintenance, Crewing, Inventory, Finance, Compliance and Charter modules and a Banking add-on; Lloyd's Register and DNV software assessment logos are shown on its site. That puts Diego close to two of the subjects: where yacht data lives, and how payments are approved and recorded.

Suggested angle: the management system as the yacht's control point for data and money. Draft questions:

1. Which onboard records are most sensitive, and where do they usually live on a yacht without a proper system (personal email, spreadsheets, WhatsApp)?
2. What does a sound payment approval chain look like on a 40 to 60 metre yacht: who raises, who approves, at what thresholds, and how a change of supplier bank details should be handled?
3. Cloud or on board: what should an owner ask a software supplier about hosting, access and what happens when the connection drops?
4. When a captain or chief stew leaves, what has to happen to access on the day they go?
5. Is AI changing how management software is used on board, and where would you draw the line on owner and guest data?

Disclosures needed: DeepBlue sells management software, including finance and banking modules. Foreland Marine is one of DeepBlue's three retained implementation partners. The second disclosure is the one the reader most needs, given the book's independence position.

## 4. Other possible voices

- Insurance: James Drysdale (Howden), already planned for ch07, on CL380 and cyber buy-back.
- Navigation: Royal Institute of Navigation (Ramsey Faragher); has spoken to yachting press on record.
- Cyber firm: Intersys (Matthew Geyman) or Pen Test Partners have both published on yachts. Commercial, so a quote at most.
- Legal: Benjamin Maltby could take one question on payment-fraud liability between broker, escrow agent and owner.

## 5. Draft checklist lines (chapter 07)

- Confirm any change of bank details by telephone to a number already held, before paying.
- Require two approvals for payments above an agreed threshold.
- Turn on multi-factor authentication for every email, banking and management system account.
- Keep guest and crew networks separate from navigation, propulsion and control systems, and remove supplier remote access that is not in use.
- Before a passage through a known interference area, check the interference maps and brief the bridge on cross-checking position by radar.
- Agree in writing what crew may post, and what may be entered into public AI tools.

## 6. Sources

- Insurance Business, "Superyacht cyber risk grows as Starlink connectivity expands", 11 Aug 2026: https://www.insurancebusinessmag.com/uk/news/cyber/superyacht-cyber-risk-grows-as-starlink-connectivity-expands-585673.aspx
- OmniAccess, "From phishing to fraud: real case of a yacht cyber breach": https://www.omniaccess.com/news/news/from-phishing-to-fraud-real-case-of-a-yacht-cyber-breach/
- Smart Maritime Network, ITIC €58,000 case, 9 Jul 2025: https://smartmaritimenetwork.com/2025/07/09/yacht-broker-gets-money-back-after-e58000-phishing-scam/
- Robb Report, Lürssen cyberattack: https://robbreport.com/motors/marine/superyacht-maker-lurssen-cyberattack-1234829503/
- The Record, MarineMax SEC filing: https://therecord.media/boat-seller-marinemax-reports-cyberattack-sec
- Yachting Monthly, "Navigating blind", June 2026: https://www.yachtingmonthly.com/cruising/navigating-blind-the-urgent-threat-of-gps-spoofing-to-sailors-105646
- Yachting World, Baltic GPS jamming, March 2026: https://www.yachtingworld.com/cruising/russian-submarines-and-gps-jamming-the-new-reality-for-baltic-cruisers-162191
- UKMTO / JMIC advisory notes, March 2026: https://www.ukmto.org/-/media/ukmto/products/update-023---jmic-advisory-note-24-mar_final.pdf
- gCaptain, GPS spoofing near Hormuz: https://gcaptain.com/electronic-fog-of-war-gps-spoofing-distorts-ship-traffic-near-hormuz/
- IACS UR E26 Rev.1: https://iacs.s3.af-south-1.amazonaws.com/wp-content/uploads/2022/02/04140503/UR-E26-Rev.1-Nov-2023-CR.pdf
- ABS, IACS UR E26/E27: https://ww2.eagle.org/en/rules-and-resources/regulatory-updates/regulatory-news-articles/IACS-Unified-Requirements-on-Cyber-Resilience.html
- Next Yacht Group, Next AI-Integrated System: https://www.nextyachtgroup.com/news-and-boat-show/next-yacht-group-presents-next-ai-integrated-system-the-first-local-first-ai-assistant-designed-for-luxury-yachts/
- Departures, "Central Intelligence: AI in Yachting": https://www.departures-international.com/in-focus/yachting/the-thinking-yacht-ai-com-2026
- Chambers, "The right to vanish": https://chambers.com/articles/the-right-to-vanish-what-privacy-rights-do-superyacht-owners-have
- Pen Test Partners, "Hacking superyachts: advice for owners": https://www.pentestpartners.com/security-blog/hacking-superyachts-advice-for-owners/
- Spear's, deepfake risk to HNWs: https://spearswms.com/law/experts-on-the-growing-risk-of-deepfakes-to-hnws-and-how-to-respond/
- DeepBlue: https://deepblue.app
