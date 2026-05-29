'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { healthPackages } from '@/lib/data';
import { ChevronLeft, ChevronRight, Check, Calendar } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function HealthPackages() {
  const [current, setCurrent] = useState(0);
  const total = healthPackages.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Show 3 at a time on desktop
  const visibleCount = 3;
  const visiblePackages = Array.from({ length: visibleCount }, (_, i) => healthPackages[(current + i) % total]);

  return (
    <section className="section-blue section-pad" aria-label="Health packages">
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-7)', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', background: 'rgba(255,255,255,0.1)', padding: '4px 14px', borderRadius: 999, marginBottom: 14, border: '1px solid rgba(255,255,255,0.15)' }}>
              Preventive Care
            </span>
            <h2 style={{ fontSize: '42px', fontWeight: 700, color: '#fff', marginBottom: 10 }}>
              Health Check Packages
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', maxWidth: 440 }}>
              Comprehensive health screenings designed by experts. Early detection saves lives.
            </p>
          </motion.div>

          {/* Carousel controls */}
          <div style={{ display: 'flex', gap: 10 }}>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={prev}
              style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Previous package"
            >
              <ChevronLeft size={20} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} onClick={next}
              style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              aria-label="Next package"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}>
          <AnimatePresence mode="popLayout">
            {visiblePackages.map((pkg, i) => (
              <motion.div
                key={pkg.id + '-' + i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                style={{
                  background: pkg.popular ? '#fff' : 'rgba(255,255,255,0.1)',
                  backdropFilter: pkg.popular ? 'none' : 'blur(8px)',
                  border: pkg.popular ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: 16, right: -24, background: 'var(--nh-red)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 36px', transform: 'rotate(45deg)', letterSpacing: '0.05em' }}>
                    POPULAR
                  </div>
                )}

                <h3 style={{ fontSize: '17px', fontWeight: 700, color: pkg.popular ? 'var(--text-primary)' : '#fff', marginBottom: 10, lineHeight: 1.3 }}>
                  {pkg.name.includes(' (') ? (
                    <>
                      {pkg.name.split(' (')[0]}
                      <span style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: pkg.popular ? 'var(--text-secondary)' : 'rgba(255,255,255,0.75)', marginTop: 4 }}>
                        ({pkg.name.split(' (')[1]}
                      </span>
                    </>
                  ) : pkg.name}
                </h3>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                  <span style={{ fontSize: '28px', fontWeight: 900, color: pkg.popular ? 'var(--nh-blue)' : '#fff' }}>
                    ₹{pkg.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: '14px', color: pkg.popular ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)', textDecoration: 'line-through' }}>
                    ₹{pkg.originalPrice.toLocaleString()}
                  </span>
                </div>

                <div style={{ fontSize: '13px', color: pkg.popular ? 'var(--nh-blue)' : 'rgba(255,255,255,0.8)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                  {pkg.tests} tests included
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 'var(--space-5)' }}>
                  {pkg.includes.slice(0, 5).map((item) => (
                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '13px', color: pkg.popular ? 'var(--text-secondary)' : 'rgba(255,255,255,0.75)' }}>
                      <Check size={14} style={{ color: pkg.popular ? 'var(--success-green)' : 'rgba(255,255,255,0.8)', flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 9999,
                    background: pkg.popular ? 'var(--nh-blue)' : 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    border: pkg.popular ? 'none' : '1px solid rgba(255,255,255,0.3)',
                    fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                    fontFamily: 'var(--font-stack)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  Book this package
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 'var(--space-5)' }}>
          {healthPackages.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, background: i === current ? '#fff' : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', transition: 'all 0.25s' }}
              aria-label={`Go to package ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 900px) {
          [aria-label="Health packages"] .container > div:nth-child(2) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          [aria-label="Health packages"] .container > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
