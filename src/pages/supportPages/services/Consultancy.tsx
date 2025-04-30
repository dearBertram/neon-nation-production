import React from 'react';
import TopNavAlternative from '../../../components/topNavAlternative/TopNavAlternative.tsx';

import hero from '/services/binaryHeart.jpg'
import price from '/services/priceReview.svg'
import marketing from '/services/marketing.svg'
import product from '/services/product.svg'
import data from '/services/data.svg'
import linkedInLogo from '/services/LI-Logo.png'
import servicesLogo from '/services/nn_logo_purple_bkg_circle.svg'
import change from '/services/change.png'
import transform from '/services/transform.png'
import learn from '/services/learn.png'
import sales from '/services/sales.png'

import styles from './Consultancy.module.css';

const Consultancy: React.FC = () => {
    return (
        <div className={styles.container}>
            <TopNavAlternative />
            <div className={styles.heroSection}>
                <img src={hero} alt='Hero Image' className={styles.heroImage} />
                <div className={styles.logoContainer}>
                    <img src={servicesLogo} alt='Neon Services logo' className={styles.servicesLogo} />
                    <p className={styles.logoName}>Neon Services</p>
                </div>
            </div>
            <div className={styles.introCopy}>
                <h1 className={styles.title}>Specialist Publishing Consultancy</h1>
                <h3 className={styles.subHeading}>Delivering sustainable transformation</h3>
                <p className={styles.description}>
                   A strategic and results-driven executive with over 25 years of experience in education, publishing, and digital transformation. Having led commercial development initiatives, pricing strategies, and digital business transitions on a global scale, I now help businesses navigate the evolving landscape of publishing technology, and digital services.
                </p>
                <p className={styles.description}>
                    At Neon Services, I bring together deep industry expertise with a passion for technology, data, and innovation. Whether it’s optimising commercial strategies, driving digital growth, or refining operational efficiencies, I'll work closely with organisations to deliver measurable impact.
                </p>
            </div>
            <div className={styles.recentProjectsContainer}>
                <h1 className={styles.title}>Recent projects</h1>
                <div className={styles.recentProjectsGrid}>
                    <div className={styles.projectCard}>
                        <img src={price} alt='Project Icon 1' className={styles.projectIcon} />
                        <p className={styles.projectHeading}>Global pricing review</p>
                        <p className={styles.projectDescription}>Led a team on a global revenue review project, working alongside a market-leading pricing consultancy to drive strategic insights and growth</p>
                    </div>
                    <div className={styles.projectCard}>
                        <img src={marketing} alt='Project Icon 2' className={styles.projectIcon} />
                        <p className={styles.projectHeading}>Ecommerce strategy</p>
                        <p className={styles.projectDescription}>Designed and implemented a new digital sales model, expanding direct-to-consumer sales, enhancing customer engagement, and driving revenue growth</p>
                    </div>
                    <div className={styles.projectCard}>
                        <img src={product} alt='Project Icon 3' className={styles.projectIcon} />
                        <p className={styles.projectHeading}>Portfolio review</p>
                        <p className={styles.projectDescription}>Delivered a root and branch review of over 2,000 global product lines identifying opportunities for revenue optimisation and cost reduction</p>
                    </div>
                    <div className={styles.projectCard}>
                        <img src={data} alt='Project Icon 4' className={styles.projectIcon} />
                        <p className={styles.projectHeading}>Global sales reporting</p>
                        <p className={styles.projectDescription}>Concept and delivery of a global sales reporting environment using Google Cloud Platform. Providing data accessibility and greater insights</p>
                    </div>
                </div>
            </div>
            <div className={styles.servicesContainer}>
                <h1 className={styles.title}>Services</h1>
                <div className={styles.servicesGrid}>
                    <div className={styles.servicesCard}>
                        <img src={change} alt='Decorative image' className={styles.servicesImage} />
                        <div className={styles.servicesContent}>
                            <p className={styles.projectHeading}>Strategic Consultancy</p>
                            <ul className={styles.listItems}>
                                <li>Model transformation & change management</li>
                                <li>Commercial leadership & growth strategies</li>
                                <li>Market expansion & pricing strategy optimisation</li>
                                <li>Organisational transformation & P&L responsibility</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.servicesCard}>
                        <img src={transform} alt='Decorative image' className={styles.servicesImage} />
                        <div className={styles.servicesContent}>
                            <p className={styles.projectHeading}>Digital & Technology Transformation</p>
                            <ul className={styles.listItems}>
                                <li>Digital product strategy & development</li>
                                <li>eCommerce growth & direct-to-consumer models</li>
                                <li>Large-scale data analysis & insights</li>
                                <li>UX optimisation & digital conversion improvement</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.servicesCard}>
                        <img src={learn} alt='Decorative image' className={styles.servicesImage} />
                        <div className={styles.servicesContent}>
                            <p className={styles.projectHeading}>Education & Publishing Solutions</p>
                            <ul className={styles.listItems}>
                                <li>Learning application design & development</li>
                                <li>Digital content strategy & product innovation</li>
                                <li>Procurement & supply chain optimisation</li>
                                <li>Agile project management & operational efficiency</li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.servicesCard}>
                        <img src={sales} alt='Decorative image' className={styles.servicesImage} />
                        <div className={styles.servicesContent}>
                            <p className={styles.projectHeading}>Sales Force Optimisation</p>
                            <ul className={styles.listItems}>
                                <li>Restructuring & performance enhancement</li>
                                <li>Data-driven sales strategy development</li>
                                <li>CRM & sales funnel optimisation</li>
                                <li>Sales automation & efficiency improvements</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.consultancySection}>
                <div className={styles.consultancyContent}>
                    <div className={styles.leftColumn}>
                        <h2 className={styles.title}>Why Work With Me?</h2>
                        <p className={styles.subHeading}>Bespoke solutions tailored to your business challenges</p>
                    </div>
                    <div className={styles.rightColumn}>
                        <h3 className={styles.subHeading}>
                            Expert guidance and actionable solutions
                        </h3>
                        <div className={styles.textCard}>
                            <h4 className={styles.subHeading}>Impact on Revenue Growth & Profitability</h4>
                            <p className={styles.description}>
                                With a track record of driving sustained revenue growth, I have consistently delivered multi-year commercial success through strategic market expansion, innovative pricing models, and optimised sales channels. My leadership has contributed to steady double-digit CAGR growth in global markets, alongside significant increases in revenue streams through data-driven pricing strategies and commercial innovations. By aligning sales models with evolving market needs, I have helped organisations unlock new revenue opportunities and maximise profitability.
                            </p>
                        </div>
                        <div className={styles.textCard}>
                            <h4 className={styles.subHeading}>Digital Expertise & Business Transformation</h4>
                            <p className={styles.description}>
                                I have led large-scale digital transformations, reshaping traditional business models to capitalise on the opportunities of a digital-first world. By developing scalable digital product strategies, optimising eCommerce and direct-to-consumer sales, and implementing innovative service offerings, I have successfully more than doubled digital revenue growth over multiple years. My approach combines market-driven insights with cutting-edge technology solutions to ensure organisations stay ahead in an increasingly digital landscape.
                            </p>
                        </div>
                        <div className={styles.textCard}>
                            <h4 className={styles.subHeading}>Strategic Insight & Operational Excellence</h4>
                            <p className={styles.description}>
                                Bringing extensive experience in commercial strategy, business transformation, and operational efficiency, I have worked across global markets to streamline business processes, drive cost efficiencies, and build high-performing teams. Through meticulous financial oversight, supply chain optimisation, and data-led decision-making, I have contributed to double-digit operational cost savings while enhancing profitability and long-term sustainability.
                            </p>
                        </div>
                        <div className={styles.textCard}>
                            <h4 className={styles.subHeading}>Innovation and Data Driven Approach</h4>
                            <p className={styles.description}>
                                I combine deep industry expertise with a passion for technology and creativity. From leading AI-driven data analytics initiatives to hands-on development in eCommerce and digital platforms, I embrace innovation to drive competitive advantage. My ability to merge commercial leadership with technical fluency ensures that businesses are equipped with future-proof strategies that align with both customer needs and revenue objectives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.contactSection}>
                <div className={styles.contactContent}>
                    <div className={styles.contactLeft}>
                        <img src={transform} alt='Stuart Wilson' className={styles.profileImage} />
                    </div>
                    <div className={styles.contactRight}>
                        <h2 className={styles.contactTitle}>Get in Touch</h2>
                        <p className={styles.description}>If you’re looking for strategic insight, digital innovation, and commercial expertise to drive growth in your business, let’s connect. Whether you need a one-time consultation or an ongoing partnership, I can help you navigate complex challenges and unlock new opportunities.</p>
                        <div className={styles.buttonContainer}>
                            <button className={styles.button}>
                                <a href="mailto:stuart.wilson@neonnation.org?subject=Let's%20Talk%20Consultancy" className={styles.button}>Contact me</a>
                            </button>
                        </div>
                        <a href='https://www.linkedin.com/in/stuartwilson101' target='_blank' rel='noopener noreferrer'>
                            <img src={linkedInLogo} alt='LinkedIn' className={styles.linkedinIcon} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultancy;