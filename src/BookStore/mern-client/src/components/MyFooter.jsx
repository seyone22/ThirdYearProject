import React from 'react';

const MyFooter = () => {
  return (
    <footer className="footer-container">
      <div className="w-full grid grid-cols-4 gap-4 text-center">
        {/* Column 1: Company */}
        <div>
          <h3 className="font-bold">Company</h3>
          <ul className="footer-column-list">
            <li><a href="#">About</a></li>
            <li><a href="#">Carriers</a></li>
            <li><a href="#">Brand</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        {/* Column 2: Help Center */}
        <div>
          <h3 className="font-bold">Help Center</h3>
          <ul className="footer-column-list">
            <li><a href="#">Discord server</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
        {/* Column 3: LEGAL */}
        <div>
          <h3 className="font-bold">LEGAL</h3>
          <ul className="footer-column-list">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Licensing</a></li>
            <li><a href="#">Terms and Conditions</a></li>
          </ul>
        </div>
        {/* Column 4: Downloads */}
        <div>
          <h3 className="font-bold">Downloads</h3>
          <ul className="footer-column-list">
            <li><a href="#">iOS</a></li>
            <li><a href="#">Android</a></li>
            <li><a href="#">Windows</a></li>
            <li><a href="#">MacOS</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
