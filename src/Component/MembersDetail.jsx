import { Container, Row, Col } from 'react-bootstrap';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import '../Css/CustomFinancialDetail.css';
import {
  BsPersonFill,
  BsCashCoin,
  BsPiggyBank,
  BsBank,
  BsCreditCard2FrontFill,
  BsBarChartFill,
} from 'react-icons/bs';
import { useEffect, useState } from "react";
import config from '../Constants/config';
import { getCached } from '../FetchData/requestCache';
import AOS from 'aos';
import 'aos/dist/aos.css'; // This is required

const color = '#006400';

function MembersDetail() {
  const [financialData, setFinancialData] = useState([]);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [updatedDate, setUpdatedDate] = useState(null);


  useEffect(() => {
    AOS.init({
      duration: 500,  // animation duration in ms
    });
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCached(`${config.baseUrl}/financial/getAll`);
        const data = result[0]; // Adjust if backend returns different format
        setUpdatedDate(data.academicYear);
        setFinancialData([
          { label: 'Members', count: data.members, icon: <BsPersonFill size={50} color={color} /> },
          { label: 'Share Capital ', count: data.sharecapital, icon: <BsCashCoin size={50} color={color} /> },
          { label: 'Reserve Fund', count: data.reservefund, icon: <BsPiggyBank size={50} color={color} /> },
          { label: 'Deposit', count: data.deposit, icon: <BsBank size={50} color={color} /> },
          { label: 'Loan', count: data.loan, icon: <BsCreditCard2FrontFill size={50} color={color} /> },
          { label: 'Total Assets', count: data.totalassets, icon: <BsBarChartFill size={50} color={color} /> },
        ]);
      } catch (error) {
        console.error("Unable to fetch financial data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="py-5 px-xs-1 px-sm-1" style={{ backgroundColor: '#f8f9fa', overflow: 'hidden' }}>
      <Container fluid>
        <Row className="mb-1 align-items-center justify-content-between">
          <Col xs={12} md="auto" className="text-center mx-auto">
            <h2 className="fw-bold pb-2 d-inline-block" style={{ color: "#001F3F" }} data-aos='fade-left'>
              -Institutional Profile-
            </h2>
          </Col>
          <p className="d-flex align-items-center text-muted fs-6" data-aos='fade-right'>Updated as per {updatedDate} report</p>
        </Row>

        <Row className="justify-content-center g-2" ref={ref}>
          {financialData.map((item, idx) => (
            <Col key={idx} xs={6} sm={6} md={4} lg={2} className="text-center px-2 py-3">
              <div
                className="p-3 rounded-4 shadow-sm bg-white h-100 d-flex flex-column justify-content-center info-card align-items-center border border-2"
                style={{ borderColor: '#0d6efd', transition: 'transform 0.3s ease-in-out' }}
                data-aos='fade-up'
              >
                {item.icon}
                <div className="fw-bold fs-5 text-wrap-break" style={{ color }}>
                  {inView ? <CountUp end={item.count} duration={2} /> : 0}+
                </div>
                <div className="fs-6 fw-bold text-secondary">{item.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MembersDetail;
