import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import "../contact/ContactModal.css"; 

const ContactModal = () => {
  return (
    <>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary btn-circle" data-bs-toggle="modal" data-bs-target="#contactModal">
      <FontAwesomeIcon icon={faPhone} className="phone-icon" style={{ fontSize: '30px' }} />
      </button>

      {/* Modal */}
      <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
          <div className="modal-content contact-modal">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="contact-modal-left">
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Thông tin liên hệ</h2>
                <p style={{ fontSize: '1rem', lineHeight: '1.6' }}> 
                  Chào mừng bạn đến với cửa hàng giám định kim cương của chúng tôi. 
                  Tại đây, chúng tôi cung cấp các dịch vụ giám định chất lượng và giá trị kim cương một cách chuyên nghiệp và chính xác. 
                  Với đội ngũ chuyên gia giàu kinh nghiệm và thiết bị hiện đại, chúng tôi cam kết mang lại sự hài lòng tuyệt đối cho khách hàng.
                  Hãy đến với chúng tôi để trải nghiệm dịch vụ giám định kim cương uy tín và đáng tin cậy.
                </p>
                <p style={{ fontSize: '1rem' }}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" style={{ color: '#CCA866', marginRight: '0.5rem', fontSize: '1.2rem' }} /> 304-306 Phan Xích Long, Phường 7, Quận Phú Nhuận, TP.Hồ Chí Minh, Việt Nam
                </p>
                <p style={{ fontSize: '1rem' }}>
                  <FontAwesomeIcon icon={faPhone} className="contact-icon" style={{ color: '#CCA866', marginRight: '0.5rem', fontSize: '1.2rem' }} /> +1 (555) 234-5678
                </p>
                <p style={{ fontSize: '1rem' }}>
                  <FontAwesomeIcon icon={faEnvelope} className="contact-icon" style={{ color: '#CCA866', marginRight: '0.5rem', fontSize: '1.2rem' }} /> hello@example.com
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
