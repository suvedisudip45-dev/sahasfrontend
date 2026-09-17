import mblBankingLogo from "../Images/Services/mblBankingLogo.jpeg";
import mblBankingImage from "../Images/Services/mblBankingImage.jpeg";
import qrLogo from "../Images/Services/qrLogo.jpg";
import qrImage from "../Images/Services/qrImage.jpeg";
import smsImage from "../Images/Services/smsImage.jpeg";
import smsLogo from "../Images/Services/smsLogo.jpeg";
import others from "../Images/Services/others.png";

const Services = [
  {
    title: "मोबाइल बैंकिङ सेवा",
    image: mblBankingImage,
    headerImage: mblBankingLogo,
    description: "साहस सहकारीको आधुनिक मोबाइल बैंकिङ सेवामार्फत अब जुनसुकै ठाउँबाट २४ सै घण्टा सुरक्षित रूपमा आफ्नो खाता सञ्चालन गर्नुहोस्। खाताको मौज्दात (Balance) जाँच गर्न, रकम ट्रान्सफर गर्न, बिजुली, खानेपानी, इन्टरनेटको बिल तिर्न र मोबाइल टप-अप गर्न सकिने अत्यन्तै सहज र भरपर्दो सुविधा।\n\nआधुनिक प्रविधि र बलियो सुरक्षा प्रणालीसहितको यो सेवाले तपाईंको बहुमूल्य समयको बचत गर्दै सहकारी सेवालाई तपाईंको हातको औंलामा ल्याइदिएको छ।\n\nहाम्रो आधिकारिक मोबाइल एप डाउनलोड गर्न तल दिइएको लिंक प्रयोग गर्नुहोस्:",
    id: "1",
    link1: "https://play.google.com/store/apps/details?id=com.infodev.mSahasApp",
    link2: "https://apps.apple.com/np/app/info-mdabali/id1338667402"
  },
  {
    title: "एसएमएस बैंकिङ सेवा",
    image: smsImage,
    headerImage: smsLogo,
    description: "इन्टरनेट वा स्मार्टफोन नहुँदा पनि आफ्नो खाताको गतिविधिबारे सधैं सुसूचित रहनुहोस्। खातामा रकम जम्मा हुँदा, झिक्दा वा कर्जाको किस्ता चुक्ता गर्दा तपाईंको मोबाइलमा तत्काल एसएमएस (SMS Alert) प्राप्त हुनेछ।\n\nयो सेवा सरल, भरपर्दो र प्रभावकारी छ, जसले अनधिकृत कारोबारबाट तपाईंको खातालाई सुरक्षित राख्न र तत्काल कारोबारको जानकारी लिन मद्दत गर्दछ।",
    id: "2"
  },
  {
    title: "क्यूआर (QR) भुक्तानी सेवा",
    image: qrImage,
    headerImage: qrLogo,
    description: "नगद बोक्ने र खुद्रा पैसा खोज्ने झन्झटबाट सदाका लागि मुक्त हुनुहोस्! साहस सहकारीको सुरक्षित फोनपे (Fonepay) तथा नेपालपे क्यूआर कोडमार्फत पसल, डिपार्टमेन्टल स्टोर, रेस्टुरेन्ट तथा विभिन्न सेवाहरूमा सजिलै स्क्यान गरी तत्काल भुक्तानी गर्नुहोस्।\n\nछिटो, आधुनिक र पारदर्शी डिजिटल भुक्तानीको अनुभव लिनुहोस्।",
    id: "3"
  },
  {
    title: "अन्य सदस्य सेवाहरू",
    image: others,
    headerImage: others,
    description: "साहस सहकारीले आफ्ना सदस्यहरूको सर्वाङ्गीण हितका लागि देशभित्र र बाहिरबाट रकम प्राप्त गर्न रेमिट्यान्स (विप्रेषण) सुविधा, व्यवसाय तथा बचत परामर्श, स्वास्थ्य तथा राहत कोष र सदस्य कल्याणकारी कार्यक्रमहरू निरन्तर सञ्चालन गर्दै आएको छ।",
    id: "4"
  }
];

export default Services;