import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { Images } from '../data/images';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/10 pt-16 pb-8 text-gray-300 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-1/3 h-1/2 bg-brand-green/5 blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={Images.logos.prisonEmblem} alt="Kenya Prison Emblem" className="w-12 h-12 rounded-full shadow-lg shadow-brand-gold/20" />
              <span className="font-bold text-xl text-white">Meru Prison Volleyball</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Building champions beyond the court. We believe in rehabilitation through sports, mental health advocacy, and community outreach.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-green transition-colors"><FaFacebook /></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-green transition-colors"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-brand-green transition-colors"><FaInstagram /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/team" className="hover:text-brand-gold transition-colors">Our Team</Link></li>
              <li><Link to="/campaigns" className="hover:text-brand-gold transition-colors">Mental Health Walk</Link></li>
              <li><Link to="/donate" className="hover:text-brand-gold transition-colors">Donate Now</Link></li>
              <li><Link to="/how-to-run" className="text-brand-green hover:text-white transition-colors text-sm">Dev: How To Run</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-brand-gold" />
                <span>Meru Prison Base<br/>Meru Town, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-brand-gold" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-brand-gold" />
                <span>info@meruprisonvolleyball.org</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 text-sm text-center flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Meru Prison Volleyball Team. All rights reserved.</p>
          <p className="mt-2 md:mt-0 text-gray-500 text-xs">Empowering the youth of Kenya.</p>
        </div>
      </div>
    </footer>
  );
}
