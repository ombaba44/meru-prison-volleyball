import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-16 pb-8 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-orange rounded-full flex items-center justify-center font-bold text-white">MP</div>
              <span className="font-bold text-xl text-white">Meru Prison Volleyball</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Building champions beyond the court. We believe in rehabilitation through sports, mental health advocacy, and community outreach.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-orange transition-colors"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-orange transition-colors"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-orange transition-colors"><FaInstagram /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-brand-orange transition-colors">Our Team</Link></li>
              <li><Link to="/campaigns" className="hover:text-brand-orange transition-colors">Mental Health Walk</Link></li>
              <li><Link to="/donate" className="hover:text-brand-orange transition-colors">Donate Now</Link></li>
              <li><Link to="/how-to-run" className="text-brand-blue hover:text-white transition-colors text-sm">Dev: How To Run</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-brand-orange" />
                <span>Meru Prison Base<br/>Meru Town, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-brand-orange" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-brand-orange" />
                <span>info@meruprisonvolleyball.org</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Meru Prison Volleyball Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
