import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/PublicWebsite.css';

const PublicWebsite = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
  setActiveSection(sectionId);
  setMobileMenuOpen(false);

  const element = document.getElementById(sectionId);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

  return (
    <div className="public-website">
      {/* Navigation Header */}
<header className="navbar">
  <div className="navbar-container">

    {/* Logo */}
    <div className="navbar-logo">
      <i className="fas fa-school"></i>
      <span>Premier School</span>
    </div>

    {/* Desktop Navigation */}
    <nav className="nav-menu">
      <button
        onClick={() => scrollToSection('home')}
        className="nav-link"
      >
        Home
      </button>

      <button
        onClick={() => scrollToSection('about')}
        className="nav-link"
      >
        About
      </button>

      <button
        onClick={() => scrollToSection('academics')}
        className="nav-link"
      >
        Academics
      </button>

      <button
        onClick={() => scrollToSection('facilities')}
        className="nav-link"
      >
        Facilities
      </button>

      <button
        onClick={() => scrollToSection('gallery')}
        className="nav-link"
      >
        Gallery
      </button>

      <button
        onClick={() => scrollToSection('contact')}
        className="nav-link"
      >
        Contact
      </button>

      <button
        onClick={() => navigate('/login')}
        className="nav-link login-btn"
      >
        Login
      </button>
    </nav>

    {/* Mobile / Tablet Three-Dot Button */}
    <button
      className="mobile-menu-button"
      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={mobileMenuOpen}
    >
      <i className="fas fa-ellipsis-v"></i>
    </button>

  </div>

  {/* Mobile / Tablet Navigation */}
  <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>

    <button
      onClick={() => scrollToSection('home')}
      className="mobile-nav-link"
    >
      <i className="fas fa-home"></i>
      <span>Home</span>
    </button>

    <button
      onClick={() => scrollToSection('about')}
      className="mobile-nav-link"
    >
      <i className="fas fa-info-circle"></i>
      <span>About</span>
    </button>

    <button
      onClick={() => scrollToSection('academics')}
      className="mobile-nav-link"
    >
      <i className="fas fa-graduation-cap"></i>
      <span>Academics</span>
    </button>

    <button
      onClick={() => scrollToSection('facilities')}
      className="mobile-nav-link"
    >
      <i className="fas fa-building"></i>
      <span>Facilities</span>
    </button>

    <button
      onClick={() => scrollToSection('gallery')}
      className="mobile-nav-link"
    >
      <i className="fas fa-images"></i>
      <span>Gallery</span>
    </button>

    <button
      onClick={() => scrollToSection('contact')}
      className="mobile-nav-link"
    >
      <i className="fas fa-envelope"></i>
      <span>Contact</span>
    </button>

    <button
      onClick={() => {
        setMobileMenuOpen(false);
        navigate('/login');
      }}
      className="mobile-nav-link mobile-login"
    >
      <i className="fas fa-sign-in-alt"></i>
      <span>Login</span>
    </button>

  </div>
</header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Premier School</h1>
          <p className="hero-tagline">Excellence in Education • Building Future Leaders</p>
          <p className="hero-description">
            Nurturing minds, building character, and inspiring excellence
          </p>
          <button onClick={() => scrollToSection('about')} className="cta-button">
            Learn More
          </button>
        </div>
        <div className="hero-image">
          <i className="fas fa-graduation-cap"></i>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <h2>About Our School</h2>
          <div className="about-content">
            <div className="about-text">
              <h3>Our Introduction</h3>
              <p>
                Premier School has been a beacon of educational excellence for over two decades.
                We are committed to providing a comprehensive education that develops the intellectual,
                emotional, and social capabilities of our students.
              </p>

              <div className="vision-mission">
                <div className="vision">
                  <h4>Our Vision</h4>
                  <p>
                    To create an inclusive learning environment that empowers students to achieve
                    their full potential and contribute meaningfully to society.
                  </p>
                </div>
                <div className="mission">
                  <h4>Our Mission</h4>
                  <p>
                    To provide quality education that fosters critical thinking, creativity, and
                    character development while maintaining academic excellence.
                  </p>
                </div>
              </div>

              <p className="school-description">
                With a dedicated faculty, state-of-the-art facilities, and a student-centric approach,
                we ensure that every child receives personalized attention and support to excel
                academically and personally.
              </p>
            </div>
            <div className="about-image">
              <i className="fas fa-book-open"></i>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section id="academics" className="academics-section">
        <div className="container">
          <h2>Our Classes</h2>
          <p className="section-subtitle">Quality Education from Class 1 to Class 10</p>
          <div className="classes-grid">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="class-card">
                <div className="class-number">{index + 1}</div>
                <h3>Class {index + 1}</h3>
                <p>Age {5 + index}-{6 + index} years</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" className="facilities-section">
        <div className="container">
          <h2>Our Facilities</h2>
          <p className="section-subtitle">World-Class Infrastructure for Excellence</p>
          <div className="facilities-grid">
            <div className="facility-card">
              <i className="fas fa-chalkboard-user"></i>
              <h3>Smart Classrooms</h3>
              <p>Interactive learning with modern teaching aids and technology</p>
            </div>
            <div className="facility-card">
              <i className="fas fa-book"></i>
              <h3>Library</h3>
              <p>Extensive collection of books and digital resources</p>
            </div>
            <div className="facility-card">
              <i className="fas fa-computer"></i>
              <h3>Computer Lab</h3>
              <p>State-of-the-art computers for programming and IT education</p>
            </div>
            <div className="facility-card">
              <i className="fas fa-flask"></i>
              <h3>Science Lab</h3>
              <p>Well-equipped laboratory for practical science experiments</p>
            </div>
            <div className="facility-card">
              <i className="fas fa-person-running"></i>
              <h3>Playground</h3>
              <p>Spacious grounds for sports and recreational activities</p>
            </div>
            <div className="facility-card">
              <i className="fas fa-bed"></i>
              <h3>Hostel</h3>
              <p>Comfortable and secure accommodation for boarding students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
<section id="gallery" className="gallery-section">
  <div className="container">
    <h2>School Gallery</h2>
    <p className="section-subtitle">
      Moments from Our School Life
    </p>

    <div className="gallery-grid">

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-1.png"
          alt="Annual School Event"
        />
        <p>Annual School Event</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-2.png"
          alt="Sports Day"
        />
        <p>Sports Day</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-3.png"
          alt="Science Exhibition"
        />
        <p>Science Exhibition</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-4.png"
          alt="Cultural Program"
        />
        <p>Cultural Program</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-5.png"
          alt="School Assembly"
        />
        <p>School Assembly</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-6.png"
          alt="Students Activities"
        />
        <p>Student Activities</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-7.png"
          alt="School Campus"
        />
        <p>School Campus</p>
      </div>

      <div className="gallery-item">
        <img
          src="/images/gallery/school-event-8.png"
          alt="Prize Distribution"
        />
        <p>Prize Distribution</p>
      </div>

    </div>
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Address</h3>
                  <p>123 Education Lane, School City, SC 12345</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h3>Phone</h3>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>info@premierschool.com</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3>Office Hours</h3>
                  <p>Monday - Saturday: 8:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <h3>Follow Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Premier School</h3>
            <p>Building the Leaders of Tomorrow</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#academics">Academics</a></li>
              <li><a href="#facilities">Facilities</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul>
              <li>Phone: +91 98765 43210</li>
              <li>Email: info@premierschool.com</li>
              <li>Address: 123 Education Lane</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Premier School. All rights reserved.</p>
          <p>&copy; Made by Md Zishan</p>
        </div>
      </footer>
    </div>
  );
};

export default PublicWebsite;
