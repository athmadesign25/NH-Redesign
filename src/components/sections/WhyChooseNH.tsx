'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, ShieldCheck, Globe, CheckCircle, Activity, Users, Cpu } from 'lucide-react';
import { staggerContainer, fadeInUp, viewportOnce } from '@/lib/motion';

const leftPoints = [
  {
    icon: <Award size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'JCI Enterprise',
    subtext: 'Network-wide global quality standard',
  },
  {
    icon: <ShieldCheck size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'NABH Accredited',
    subtext: 'India’s recognised hospital quality norms',
  },
  {
    icon: <Globe size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'JCI Accredited Hospitals',
    subtext: 'International patient safety benchmarks',
  },
  {
    icon: <CheckCircle size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'NABL Accredited',
    subtext: 'India’s quality norms',
  },
];

const rightPoints = [
  {
    icon: <Activity size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: '8000+',
    subtext: 'Cancer Surgeries Performed Annually',
  },
  {
    icon: <CheckCircle size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: 'CAP Accredited',
    subtext: 'India’s quality norms',
  },
  {
    icon: <Users size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: '4000+',
    subtext: 'Doctors and teams trained on standard protocols',
  },
  {
    icon: <Cpu size={24} style={{ color: 'var(--nh-blue)' }} />,
    title: '1200+',
    subtext: 'Robotic Surgeries Performed Till Date',
  },
];

function PointItem({ point, align, index, globalIndex }: { point: any, align: 'left' | 'right', index: number, globalIndex: number }) {
  const customFadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', delay: globalIndex * 0.12 }
    }
  };

  return (
    <motion.div 
      variants={customFadeInUp as any}
      className={`point-item point-${align}-${index}`}
      style={{ 
        display: 'flex', 
        gap: '16px', 
        alignItems: 'flex-start',
        textAlign: align === 'right' ? 'left' : 'right',
        flexDirection: align === 'right' ? 'row' : 'row-reverse'
      }}
    >
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '12px',
        background: 'var(--nh-blue-10)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {point.icon}
      </div>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: '4px' }}>
          {point.title}
        </h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
          {point.subtext}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyChooseNH() {
  return (
    <section id="why-choose-nh" className="section-white section-pad" aria-label="Why Choose Narayana Health">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}
        >
          <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nh-blue)', background: 'var(--nh-blue-10)', padding: '4px 14px', borderRadius: 999, marginBottom: 14 }}>
            Best in Healthcare
          </span>
          <h2 style={{ fontSize: '42px', fontWeight: 700, color: 'var(--nh-black)', marginBottom: 12 }}>
            Why Choose Narayana Health?
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto' }}>
            Where your health & well-being comes first, always!
          </p>
        </motion.div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '40px', alignItems: 'center' }} className="why-nh-grid">
          
          {/* Left Points */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            {leftPoints.map((point, i) => (
              <PointItem key={i} point={point} align="left" index={i} globalIndex={i * 2} />
            ))}
          </motion.div>

          {/* Center Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Image 
              src="/Why NH.png"
              alt="Why Narayana Health"
              width={650}
              height={650}
              style={{ objectFit: 'contain' }}
            />
          </motion.div>

          {/* Right Points */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
          >
            {rightPoints.map((point, i) => (
              <PointItem key={i} point={point} align="right" index={i} globalIndex={i * 2 + 1} />
            ))}
          </motion.div>

        </div>
      </div>

      <style jsx>{`
        @media (min-width: 1025px) {
          .point-left-0, .point-left-3 { position: relative; left: 60px; }
          .point-left-1, .point-left-2 { position: relative; left: -10px; }
          
          .point-right-0, .point-right-3 { position: relative; left: -60px; }
          .point-right-1, .point-right-2 { position: relative; left: 10px; }
        }
        @media (max-width: 1024px) {
          .why-nh-grid {
            grid-template-columns: 1fr !important;
            gap: 60px !important;
          }
          /* Re-order so image is first on mobile/tablet */
          .why-nh-grid > div:nth-child(2) {
            order: -1;
          }
          /* Realign left points to be standard left-aligned on smaller screens */
          .why-nh-grid > div:nth-child(1) > div {
            text-align: left !important;
            flex-direction: row !important;
          }
        }
      `}</style>
    </section>
  );
}
