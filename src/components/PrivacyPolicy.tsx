import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: '20px', lineHeight: '1.6', color: 'var(--text-main)', fontSize: '0.9rem' }}>
      <h2 style={{ fontFamily: 'var(--mincho-font)', marginBottom: '20px' }}>개인정보처리방침</h2>
      <p>본 서비스(RecoDinner)는 사용자의 개인정보를 소중하게 생각하며, 관련 법규를 준수합니다.</p>
      
      <h3 style={{ marginTop: '20px' }}>1. 수집하는 개인정보 항목</h3>
      <p>본 서비스는 별도의 회원가입 없이 이용 가능하며, 개인을 식별할 수 있는 정보를 수집하지 않습니다. 다만, 서비스 이용 기록(로컬스토리지)과 같은 비식별 정보가 브라우저에 저장될 수 있습니다.</p>
      
      <h3 style={{ marginTop: '20px' }}>2. 구글 에드센스 사용</h3>
      <p>본 웹사이트는 구글(Google)에서 제공하는 웹 광고 서비스인 '에드센스(AdSense)'를 이용합니다. 구글은 사용자의 방문 기록을 바탕으로 맞춤형 광고를 제공하기 위해 쿠키(Cookie)를 사용합니다. 사용자는 구글의 광고 설정에서 맞춤형 광고를 해제할 수 있습니다.</p>
      
      <h3 style={{ marginTop: '20px' }}>3. 데이터 보관</h3>
      <p>사용자가 '찢어서 보관한' 명언 데이터는 사용자의 브라우저(LocalStorage)에만 저장되며, 서버로 전송되지 않습니다.</p>
      
      <h3 style={{ marginTop: '20px' }}>4. 문의처</h3>
      <p>서비스 관련 문의는 chlgkrud981109@gmail.com으로 연락 주시기 바랍니다.</p>
    </div>
  );
};

export default PrivacyPolicy;
