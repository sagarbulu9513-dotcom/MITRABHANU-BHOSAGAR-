import { BusinessIdea, EarningOpportunity } from '../types';

export const fallbackOpportunitiesHi: EarningOpportunity[] = [
  {
    id: 'opp-1',
    title: 'स्थानीय दुकानों के लिए डिजिटल मेनू और सोशल मीडिया पोस्टर (Canva)',
    category: 'डिजिटल व फोन',
    summary: 'स्थानीय कैफे, मिठाई की दुकानों, कोचिंग सेंटर्स और ब्यूटी पार्लरों के लिए मोबाइल से आकर्षक बैनर, मेनू कार्ड और व्हाट्सएप स्टेटस बनाना।',
    realisticMonthlyRange: '₹6,000 - ₹18,000 / महीना',
    startupCost: '₹0 (केवल स्मार्टफोन और इंटरनेट)',
    requiredSkills: ['Canva ऐप की बुनियादी समझ', 'व्हाट्सएप बिजनेस का इस्तेमाल', 'स्थानीय दुकानदारों से बात करने का हुनर'],
    stepByStep: [
      'कदम 1: यूट्यूब से Canva पर हिंदी/स्थानीय भाषा में पोस्टर बनाना 3-4 दिन में मुफ्त सीखें।',
      'कदम 2: अपने मोहल्ले के 3-4 प्रतिष्ठानों (जैसे मिष्ठान भंडार या सैलून) के लिए 2-2 सुंदर सैंपल पोस्टर मुफ्त बनाएं।',
      'कदम 3: दुकानदार से मिलकर दिखाएं: "भैया, यह आपकी दुकान के व्हाट्सएप स्टेटस के लिए बनाया है, क्या आप इसे लगाना चाहेंगे?"',
      'कदम 4: उन्हें बताएं कि ₹999/महीना में आप हर त्योहार और ऑफर के लिए 10 पोस्टर बनाकर देंगे।'
    ],
    potentialChallenges: [
      'शुरुआत में दुकानदार तुरंत पैसे देने में हिचकिचा सकते हैं -> समाधान: पहले 2 पोस्टर पूरी तरह मुफ्त बनाकर उनका विश्वास जीतें।',
      'मोबाइल में स्टोरेज की कमी -> समाधान: Google Drive या Google Photos का फ्री बैकअप इस्तेमाल करें।'
    ],
    verificationTips: 'काम करने से पहले हमेशा एडवांस (25-50%) लें या काम पूरा होने पर हाथों-हाथ UPI से भुगतान लें। कभी किसी क्लाइंट को कोई "जॉब कार्ड फीस" न दें।',
    sevenDayActionPlan: [
      { day: 1, title: 'Canva इंस्टॉल करें और 5 बुनियादी टूल्स सीखें', description: 'टेक्स्ट फॉन्ट, कलर्स, बैकग्राउंड रिमूवल और पोस्टर साइज समझना।', type: 'learning' },
      { day: 2, title: 'त्योहार और दुकान के 3 सैंपल बैनर बनाएं', description: 'एक मिठाई की दुकान, एक सैलून और एक कपड़े की दुकान का डमी पोस्टर बनाएं।', type: 'learning' },
      { day: 3, title: 'अपने आस-पास की 10 दुकानों की सूची बनाएं', description: 'वे दुकानें जो व्हाट्सएप स्टेटस या सोशल मीडिया का कम इस्तेमाल करती हैं।', type: 'learning' },
      { day: 4, title: 'पहली 3 दुकानों पर जाकर फ्री सैंपल दिखाएं', description: 'दुकानदार का फोन नंबर और अनुमति लेकर उन्हें सैंपल व्हाट्सएप करें।', type: 'earning' },
      { day: 5, title: 'फीडबैक लें और उनके सुझाव अनुसार सुधारें', description: 'अगर उन्होंने स्टेटस पर लगाया है तो पूछें कि ग्राहकों का क्या रिस्पॉन्स रहा।', type: 'earning' },
      { day: 6, title: 'महीने का पैकेज ऑफर करें (₹800 - ₹1,200)', description: 'हर हफ्ते 2-3 नए स्टेटस और पोस्टर बनाकर देने की बात तय करें।', type: 'earning' },
      { day: 7, title: 'पहला पेड ऑर्डर लें और रसीद साझा करें', description: 'अपनी कमाई का रिकॉर्ड डायरी या ऐप में दर्ज करें।', type: 'earning' },
    ],
  },
  {
    id: 'opp-2',
    title: 'घर से टिफिन व कस्टमाइज्ड स्नैक सर्विस (Homemaker Special)',
    category: 'खान-पान व होम-बेस्ड',
    summary: 'आस-पास के पीजी (PG), हॉस्टल के छात्रों, बैंक कर्मियों या क्लिनिक स्टाफ को शुद्ध, घर का बना दोपहर का भोजन उपलब्ध कराना।',
    realisticMonthlyRange: '₹10,000 - ₹28,000 / महीना',
    startupCost: '₹1,500 - ₹3,000 (टिफिन बॉक्स व शुरुआती राशन)',
    requiredSkills: ['स्वादिष्ट व साफ-सुथरा भोजन पकाना', 'समय की पाबंदी', 'बुनियादी हिसाब-किताब'],
    stepByStep: [
      'कदम 1: अपने घर के 500 मीटर के दायरे में स्थित बैंक, अस्पताल, कोचिंग और पीजी की पहचान करें।',
      'कदम 2: 5 टिफिन बॉक्स खरीदें और 3 दिन के ट्रायल पैक (₹70-₹90 प्रति टिफिन) का पैम्फलेट या व्हाट्सएप मैसेज तैयार करें।',
      'कदम 3: पहले 4-5 ग्राहकों से साप्ताहिक अग्रिम (Weekly Advance) भुगतान लेकर शुरुआत करें ताकि अपनी जेब से राशन का बोझ न पड़े।',
      'कदम 4: स्वाद और स्वच्छता पर पूरा ध्यान दें। नि:शुल्क FSSAI बेसिक रजिस्ट्रेशन (FSSAI Registration) ऑनलाइन करें।'
    ],
    potentialChallenges: [
      'टिफिन डिलीवरी का समय पर पहुंचना -> समाधान: साइकिल या स्थानीय डिलीवरी लड़के/ऑटो वाले से ₹15 प्रति टिफिन पर टाई-अप करें।',
      'सब्जी व गैस के बढ़ते दाम -> समाधान: हफ्ते का मेनू पहले से तय करें और थोक सब्जी मंडी से सामान खरीदें।'
    ],
    verificationTips: 'ग्राहकों से हमेशा साप्ताहिक या 15 दिन का एडवांस लें। कभी किसी ऑनलाइन अज्ञात "टिफिन कॉन्ट्रैक्ट" कंपनी को रजिस्ट्रेशन फीस न दें।',
    sevenDayActionPlan: [
      { day: 1, title: 'लागत और प्रति टिफिन खर्च का हिसाब बनाएं', description: 'दाल, रोटी, चावल, सब्जी, तेल और पैकेजिंग का प्रति थाली खर्च निकालें।', type: 'learning' },
      { day: 2, title: 'मेनू कार्ड और समय सारणी तय करें', description: 'सोमवार से शनिवार का संतुलित मेनू और डिलीवरी समय (दोपहर 12:30 - 1:30) फिक्स करें।', type: 'learning' },
      { day: 3, title: 'FSSAI की वेबसाइट पर फ्री बेसिक रजिस्ट्रेशन फॉर्म समझें', description: 'foscos.fssai.gov.in पर 12 लाख से कम टर्नओवर का बेसिक रजिस्ट्रेशन देख लें।', type: 'learning' },
      { day: 4, title: 'पास के 2 कोचिंग या बैंकों में जाकर 5 लोगों से बात करें', description: 'उन्हें बताएं कि घर का बना हल्का, कम तेल वाला खाना मिलेगा।', type: 'earning' },
      { day: 5, title: 'पहले 3 लोगों को ट्रायल लंच डिलीवर करें', description: 'उनसे खाने की गुणवत्ता और समय के बारे में राय लें।', type: 'earning' },
      { day: 6, title: 'ट्रायल वालों से 15 दिन का एडवांस सब्सक्रिप्शन लें', description: 'UPI क्यूआर कोड से भुगतान स्वीकार करें।', type: 'earning' },
      { day: 7, title: 'नियमित 5 टिफिन की सप्लाई शुरू करें', description: 'खर्च घटाकर अपना शुद्ध मुनाफा (Profit) अलग गुल्लक में रखें।', type: 'earning' },
    ],
  },
  {
    id: 'opp-3',
    title: 'सीएससी / ई-मित्र / जन सेवा केंद्र डिजिटल सहायता मित्र',
    category: 'ग्रामीण व कस्बा सेवा',
    summary: 'ग्रामीण व अर्ध-शहरी इलाकों में ग्रामीणों को सरकारी योजनाओं (पीएम किसान, आयुष्मान कार्ड, आधार सुधार, छात्रवृत्ति फॉर्म) में मदद करना।',
    realisticMonthlyRange: '₹7,000 - ₹20,000 / महीना',
    startupCost: '₹500 - ₹2,000 (अगर स्मार्टफोन पहले से है)',
    requiredSkills: ['ऑनलाइन फॉर्म भरना', 'हिंदी-अंग्रेजी बुनियादी पढ़ना', 'धैर्य और ईमानदारी'],
    stepByStep: [
      'कदम 1: उमंग ऐप (UMANG), डिजिलॉकर और मुख्य सरकारी पोर्टलों को चलाना सीखें।',
      'कदम 2: नजदीकी अधिकृत सीएससी केंद्र (CSC Center) से संपर्क करें और उनके फील्ड एजेंट या फॉर्म भरने वाले सहायक के रूप में जुड़ें।',
      'कदम 3: गांव की चौपाल या स्थानीय किराना दुकान पर सूचना लगाएं कि आप पेंशन, छात्रवृत्ति और राशन कार्ड आवेदन में मदद करते हैं।',
      'कदम 4: सरकार द्वारा निर्धारित नाममात्र सुविधा शुल्क (₹20 - ₹50 प्रति फॉर्म) ही लें।'
    ],
    potentialChallenges: [
      'इंटरनेट नेटवर्क की समस्या -> समाधान: जिस कंपनी का टावर गांव में बेहतर हो, उसी का 4G/5G सिम इस्तेमाल करें।',
      'अस्पष्ट जानकारी से फॉर्म रिजेक्ट होना -> समाधान: सभी दस्तावेज (आधार, बैंक पासबुक, आय प्रमाण) पहले ठीक से चेक करें।'
    ],
    verificationTips: 'हमेशा आधिकारिक सरकारी वेबसाइटों (.gov.in / .nic.in) का ही उपयोग करें। किसी फर्जी बिचौलिए को "सीएससी लाइसेंस" के नाम पर रिश्वत न दें।',
    sevenDayActionPlan: [
      { day: 1, title: 'UMANG ऐप और जन कल्याण पोर्टल का अध्ययन करें', description: 'पीएम किसान और आयुष्मान भारत की पात्रता शर्तों को समझें।', type: 'learning' },
      { day: 2, title: 'नजदीकी सीएससी संचालक से मिलें', description: 'पूछें कि क्या वे फॉर्म भरने में आपका सहयोग लेंगे और कमीशन साझा करेंगे।', type: 'learning' },
      { day: 3, title: 'जरूरी फॉर्म्स की चेकलिस्ट तैयार करें', description: 'कौन-से दस्तावेज साथ लाने हैं, उसकी एक साफ लिस्ट कॉपी में बनाएं।', type: 'learning' },
      { day: 4, title: 'अपने मोहल्ले या गांव के 5 वृद्धजनों का जीवन प्रमाण पत्र / पेंशन स्टेटस चेक करें', description: 'उनकी परेशानी समझें और मदद करें।', type: 'earning' },
      { day: 5, title: 'कॉलेज छात्रों के छात्रवृत्ति फॉर्म भरने में सहायता करें', description: 'कॉलेज या कोचिंग के बाहर पर्ची लगाएं।', type: 'earning' },
      { day: 6, title: '10 फॉर्म सफलता पूर्वक सबमिट करें', description: 'ग्राहकों को पावती रसीद (Acknowledgement Receipt) प्रिंट या व्हाट्सएप करें।', type: 'earning' },
      { day: 7, title: 'साप्ताहिक हिसाब करें और अपना शुद्ध लाभ निकालें', description: 'आगे के लिए पोर्टेबल मिनी प्रिंटर खरीदने का बचत लक्ष्य तय करें।', type: 'earning' },
    ],
  },
];

export const fallbackOpportunitiesEn: EarningOpportunity[] = [
  {
    id: 'opp-1-en',
    title: 'Canva Social Media & Digital Menu Designer for Local Shops',
    category: 'Digital & Phone',
    summary: 'Design vibrant WhatsApp status promos, digital food menus, and festive greeting banners for local bakeries, salons, coaching centers, and grocery stores using only your phone.',
    realisticMonthlyRange: '₹6,000 - ₹18,000 / month',
    startupCost: '₹0 (Just your smartphone & internet connection)',
    requiredSkills: ['Basic Canva navigation', 'WhatsApp Business familiarity', 'Polite local communication'],
    stepByStep: [
      'Step 1: Watch 2-3 free YouTube tutorials on Canva basics (fonts, colors, background removal).',
      'Step 2: Create 2 free mock sample flyers for 2 neighborhood businesses (e.g. local sweet shop or salon).',
      'Step 3: Walk up to the owner and show: "Sir, I made this clean promotional graphic for your WhatsApp status. You can use it for free today!"',
      'Step 4: Once they like it, pitch a simple monthly retainership (e.g. ₹999/month for 10 custom festival & offer creatives).'
    ],
    potentialChallenges: [
      'Shopkeepers being skeptical -> Solution: Give the first 2 designs completely free to build trust.',
      'Limited phone storage -> Solution: Store past designs in Google Drive free storage.'
    ],
    verificationTips: 'Collect payments directly via UPI upon delivery or ask for 25% upfront. Never pay any "registration fee" to any third party.',
    sevenDayActionPlan: [
      { day: 1, title: 'Install Canva and practice core editing tools', description: 'Learn text styling, brand color picking, and banner dimensions.', type: 'learning' },
      { day: 2, title: 'Design 3 sample promo banners for local niches', description: 'Create one each for a gym, a sweet shop, and a coaching center.', type: 'learning' },
      { day: 3, title: 'List 10 target stores in your neighborhood', description: 'Pick stores that currently have zero or poor WhatsApp status updates.', type: 'learning' },
      { day: 4, title: 'Approach 3 shop owners and share the free design', description: 'Get their phone numbers with permission and message the graphic.', type: 'earning' },
      { day: 5, title: 'Follow up on status views and offer festival pack', description: 'Offer a pack of 8-10 banners for the upcoming festival season.', type: 'earning' },
      { day: 6, title: 'Sign up your first paying client for ₹800 - ₹1,200', description: 'Agree on weekly delivery days and topics.', type: 'earning' },
      { day: 7, title: 'Deliver the first batch and collect payment via UPI', description: 'Log your earnings in your expense tracker.', type: 'earning' },
    ],
  },
  {
    id: 'opp-2-en',
    title: 'Home-Cooked Lunch & Tiffin Box Subscription',
    category: 'Food & Home-Based',
    summary: 'Prepare hygienic, comforting home-cooked lunch boxes for nearby bank staff, clinic workers, and students living in PGs or hostels.',
    realisticMonthlyRange: '₹10,000 - ₹28,000 / month',
    startupCost: '₹1,500 - ₹3,000 (Tiffin boxes and initial groceries)',
    requiredSkills: ['Tasty home cooking', 'Strict cleanliness', 'Punctual delivery schedule'],
    stepByStep: [
      'Step 1: Map banks, diagnostic labs, coaching centers, and PGs within a 1 km radius of your home.',
      'Step 2: Purchase 5 leak-proof tiffins and prepare a 3-day introductory trial pack (₹70-₹90 per meal).',
      'Step 3: Collect weekly advance from clients to finance fresh ingredients without taking personal debt.',
      'Step 4: Register for free basic FSSAI registration (under ₹12 lakh annual turnover) online.'
    ],
    potentialChallenges: [
      'Delivering on time every day -> Solution: Partner with a local cycle courier or student for ₹15/tiffin.',
      'Raw material price inflation -> Solution: Buy lentils, rice, and spices in wholesale bags from the main mandi.'
    ],
    verificationTips: 'Always operate on prepaid weekly subscriptions. Never pay any online broker pretending to offer "bulk corporate lunch contracts".',
    sevenDayActionPlan: [
      { day: 1, title: 'Calculate cost per plate down to the rupee', description: 'Measure costs of oil, dal, veggies, atta, packaging, and gas per meal.', type: 'learning' },
      { day: 2, title: 'Draft a balanced weekly rotation menu', description: 'Design Monday to Saturday meals with no repetitive monotony.', type: 'learning' },
      { day: 3, title: 'Review FSSAI online basic food registration process', description: 'Visit foscos.fssai.gov.in and understand requirements.', type: 'learning' },
      { day: 4, title: 'Distribute 10 printed or WhatsApp trial flyers', description: 'Pitch to nearby bank employees or hostel students.', type: 'earning' },
      { day: 5, title: 'Cook and deliver 3 paid trial meals on time', description: 'Gather feedback on spice and portion size.', type: 'earning' },
      { day: 6, title: 'Convert trial customers into weekly prepaid subscribers', description: 'Accept payments via personal UPI QR code.', type: 'earning' },
      { day: 7, title: 'Review total revenue and set aside pure profit', description: 'Reinvest 20% into quality containers and insulated bags.', type: 'earning' },
    ],
  },
  {
    id: 'opp-3-en',
    title: 'Citizen Digital Service Helper (CSC / Jan Seva Kendra Partner)',
    category: 'Rural & Small Town Service',
    summary: 'Assist villagers and elderly citizens in filling out digital government schemes, scholarship forms, Ayushman cards, and utility bill payments.',
    realisticMonthlyRange: '₹7,000 - ₹20,000 / month',
    startupCost: '₹500 - ₹2,000 (If you already own a smartphone)',
    requiredSkills: ['Online portal navigation', 'Reading English and Hindi documents', 'Patience and integrity'],
    stepByStep: [
      'Step 1: Learn to use UMANG app, DigiLocker, and state service portals.',
      'Step 2: Partner with a licensed CSC (Common Service Center) operator to assist with village-level documentation.',
      'Step 3: Put up an informational board at the village square or grocery shop announcing form assistance.',
      'Step 4: Charge only the nominal convenience fee (₹20 - ₹50 per completed form).'
    ],
    potentialChallenges: [
      'Spotty rural internet connectivity -> Solution: Use a phone network with the strongest local 4G/5G signal.',
      'Rejected applications -> Solution: Cross-verify Aadhaar, mobile linkage, and bank passbooks before submitting.'
    ],
    verificationTips: 'Only use official .gov.in portals. Never pay bribes to middlemen promising "instant government franchises".',
    sevenDayActionPlan: [
      { day: 1, title: 'Master UMANG and state welfare portals', description: 'Review eligibility for PM-Kisan, Ayushman Bharat, and pensions.', type: 'learning' },
      { day: 2, title: 'Meet with local authorized CSC operator', description: 'Propose a commission-sharing model for field document collection.', type: 'learning' },
      { day: 3, title: 'Prepare a laminated checklist of required documents', description: 'List required papers for Aadhaar update, caste certificate, and pension.', type: 'learning' },
      { day: 4, title: 'Help 5 elderly neighbors check their pension status', description: 'Assist them politely and build initial goodwill in your neighborhood.', type: 'earning' },
      { day: 5, title: 'Assist students with online scholarship filings', description: 'Charge a fair nominal fee of ₹40 per submission.', type: 'earning' },
      { day: 6, title: 'Process 10 successful applications and issue receipts', description: 'Always provide client acknowledgement slips.', type: 'earning' },
      { day: 7, title: 'Tally weekly income and allocate savings', description: 'Plan towards purchasing a portable mini bluetooth printer.', type: 'earning' },
    ],
  },
];

export const fallbackBusinessIdeas: BusinessIdea[] = [
  {
    id: 'biz-1',
    name: 'मोबाइल स्क्रीन गार्ड व फोन एक्सेसरी कॉर्नर (Mobile Kiosk)',
    tag: 'लो-इन्वेस्टमेंट, हाई मार्जिन',
    investmentRange: '₹3,000 - ₹8,000',
    profitMargin: '50% - 65%',
    category: 'service',
    locationSuitability: ['rural', 'semi-urban', 'urban'],
    breakdownOfCosts: [
      { item: 'होलसेल स्क्रीन गार्ड्स (50 पीस विभिन्न मॉडल्स)', cost: '₹1,500' },
      { item: 'चार्जर केबल्स, OTG, ईयरफोन और बैक कवर्स', cost: '₹2,500' },
      { item: 'डिस्प्ले बोर्ड व छोटा फोल्डिंग टेबल', cost: '₹1,000' },
      { item: 'क्लीनिंग वाइप्स व इंस्टॉलेशन टूल्स', cost: '₹500' },
    ],
    requiredResources: ['छोटा स्थान (किराना दुकान या बस स्टैंड के पास)', 'स्क्रीन गार्ड लगाने का 2 दिन का अभ्यास', 'थोक बाजार से सीधी खरीद'],
    demandValidation: 'बाजार में 5-6 मोबाइल दुकानों पर जाकर देखें कि लोग ग्लास टूटने पर कितना चुका रहे हैं। एक दिन किसी मित्र की दुकान के बाहर बैठकर 10 स्क्रीन गार्ड लगाकर देखें।',
    businessRisks: ['नए फोन मॉडल्स आने पर पुराना स्टॉक अटकना -> सावधानी: केवल सर्वाधिक बिकने वाले 10 फोन मॉडल्स के ही गार्ड्स रखें।'],
    licenseNeeded: 'किसी बड़े लाइसेंस की जरूरत नहीं। केवल स्थानीय दुकान मालिक से सहमति और Udyam रजिस्ट्रेशन (नि:शुल्क)।',
    firstMonthRoadmap: [
      'हफ्ता 1: थोक इलेक्ट्रॉनिक मंडी से 50 लोकप्रिय स्क्रीन गार्ड्स और टूल किट लाएं।',
      'हफ्ता 2: किसी व्यस्त चौराहे या चाय की दुकान के कोने पर फोल्डिंग टेबल लगाएं।',
      'हफ्ता 3: हर दिन कम से कम 10-15 स्क्रीन गार्ड्स लगाने का लक्ष्य रखें (मुनाफा ₹400-₹600 रोजाना)।',
      'हफ्ता 4: मोबाइल बैक कवर और चार्जिंग केबल का स्टॉक जोड़ें।',
    ],
  },
  {
    id: 'biz-2',
    name: 'मसाला पिसाई व पैकेजिंग (Home Spices Unit)',
    tag: 'शुद्धता की गारंटी, घर से शुरुआत',
    investmentRange: '₹4,000 - ₹12,000',
    profitMargin: '35% - 50%',
    category: 'food',
    locationSuitability: ['rural', 'semi-urban', 'urban'],
    breakdownOfCosts: [
      { item: 'सबूत हल्दी, धनिया, जीरा, मिर्च थोक मंडी से', cost: '₹3,000' },
      { item: 'फूड-ग्रेड पाउच व लेबल प्रिंटिंग (100 पीस)', cost: '₹1,200' },
      { item: 'इलेक्ट्रिक हैंड सीलर मशीन (पैकिंग हेतु)', cost: '₹800' },
      { item: 'डिजिटल वजन कांटा (Small Weighing Scale)', cost: '₹600' },
    ],
    requiredResources: ['घरेलू भारी मिक्सर या पास की आटा/मसाला चक्की', 'साफ-सुथरा कमरा', 'हैंड सीलर'],
    demandValidation: 'पड़ोस के 10 घरों में 50 ग्राम के शुद्ध हल्दी और धनिया के सैंपल पैकेट मुफ्त दें। उनसे पूछें: "क्या बाजार के मिलावटी मसाले से बेहतर स्वाद है?"',
    businessRisks: ['बारिश के मौसम में नमी से मसाले खराब होना -> सावधानी: एयरटाइट जार और तुरंत सील किए गए पाउच का उपयोग करें।'],
    licenseNeeded: 'FSSAI Basic Registration (मुफ्त/नाममात्र शुल्क) + MSME Udyam (नि:शुल्क)।',
    firstMonthRoadmap: [
      'हफ्ता 1: कच्चा साबुत मसाला लाकर सुखाएं और चक्की पर शुद्ध पिसवाएं।',
      'हफ्ता 2: 100g और 250g के खूबसूरत सीलबंद पैकेट तैयार करें।',
      'हफ्ता 3: मोहल्ले की महिलाओं और 5 किराना दुकानों को रीसेल के लिए सैंपल दें।',
      'हफ्ता 4: हर महीने 50 नियमित घरों की सूची बनाकर अग्रिम सप्लाई शुरू करें।',
    ],
  },
  {
    id: 'biz-3',
    name: 'केंचुआ खाद / वर्मीकम्पोस्ट उत्पादन (Vermicompost)',
    tag: 'ग्रामीण व अर्ध-शहरी युवाओं के लिए',
    investmentRange: '₹3,000 - ₹10,000',
    profitMargin: '45% - 60%',
    category: 'agri',
    locationSuitability: ['rural', 'semi-urban'],
    breakdownOfCosts: [
      { item: 'गोबर (Cow dung) व कृषि अवशेष', cost: '₹1,000' },
      { item: 'ऑस्ट्रेलियन/आइसिनिया केंचुए (Eisenia Fetida) 2-3 किलो', cost: '₹1,200' },
      { item: 'एचडीपीई वर्मी बेड या तिरपाल', cost: '₹1,500' },
      { item: 'पैकिंग बैग्स (5kg / 10kg)', cost: '₹800' },
    ],
    requiredResources: ['छायादार जगह (पेड़ के नीचे या छप्पर)', 'पानी का छिड़काव', 'गोबर की उपलब्धता'],
    demandValidation: 'पास के शहर की नर्सरियों, छत पर बागवानी करने वालों और जैविक किसानों से संपर्क करें। 1 किलो का केंचुआ खाद ₹15-₹30 में आसानी से बिकता है।',
    businessRisks: ['अत्यधिक गर्मी या चींटियों से केंचुओं को नुकसान -> सावधानी: नमी 30-40% बनाए रखें और किनारों पर पानी की नाली बनाएं।'],
    licenseNeeded: 'कृषि उत्पाद होने के कारण शुरुआती स्तर पर किसी लाइसेंस की आवश्यकता नहीं।',
    firstMonthRoadmap: [
      'हफ्ता 1: 1 वर्मी बेड तैयार करें, ठंडा गोबर और फसल कचरा भरें।',
      'हफ्ता 2: केंचुए छोड़ें और नमी बनाए रखने के लिए बोरी ढकें।',
      'हफ्ता 3: 45-60 दिनों में खाद तैयार होगी, तब तक नर्सरियों में संपर्क बनाएं।',
      'हफ्ता 4: केंचुओं की संख्या दोगुनी हो जाएगी जिन्हें बेचकर भी अतिरिक्त कमाई होती है।',
    ],
  },
  {
    id: 'biz-4',
    name: 'बुटीक अल्टरेशन व कस्टमाइज्ड सिलाई (Alteration & Tailoring)',
    tag: 'महिलाओं व गृहणियों के लिए सशक्त जरिया',
    investmentRange: '₹2,000 - ₹7,000',
    profitMargin: '70% - 85%',
    category: 'craft',
    locationSuitability: ['rural', 'semi-urban', 'urban'],
    breakdownOfCosts: [
      { item: 'सिलाई मशीन (यदि पुरानी है तो सर्विसिंग, नई है तो ईएमआई)', cost: '₹1,500' },
      { item: 'धागे, सुई, फॉल, जिप, इलास्टिक और बुकरम सेट', cost: '₹1,000' },
      { item: 'इलेक्ट्रिक प्रेस व कटिंग कैंची', cost: '₹1,200' },
    ],
    requiredResources: ['सिलाई मशीन', 'नापने का फीता', 'धैर्य और फिनिशिंग'],
    demandValidation: 'ऑनलाइन खरीदे गए कपड़ों (Amazon, Myntra, Meesho) में 60% लोगों को फिटिंग और लंबाई की समस्या होती है। अल्टरेशन की मांग हर घर में है।',
    businessRisks: ['कपड़ा खराब होने पर ग्राहक का नाराज होना -> सावधानी: हमेशा ग्राहक की मौजूदगी में चाक से नाप लगाएं।'],
    licenseNeeded: 'घरेलू स्तर पर कोई लाइसेंस नहीं।',
    firstMonthRoadmap: [
      'हफ्ता 1: अपने घर के बाहर साफ बोर्ड लगाएं: "यहाँ कुर्ती, पैंट और सूट की अल्टरेशन व सिलाई की जाती है।"',
      'हफ्ता 2: पड़ोस की 10 महिलाओं को बताएं कि 24 घंटे में फिटिंग ठीक करके दी जाएगी।',
      'हफ्ता 3: बच्चों के स्कूल यूनिफॉर्म और पर्दों की हेमिंग का काम लें।',
      'हफ्ता 4: ब्लाउज और डिजाइनर सूट की सिलाई शुरू करके आय दोगुनी करें।',
    ],
  },
];
