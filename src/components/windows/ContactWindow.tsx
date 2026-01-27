'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Send, Check, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ContactWindow() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the form data
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const contactLinks = [
    {
      label: 'Email',
      value: 'don@example.com',
      icon: Mail,
      href: 'mailto:don@example.com',
    },
    {
      label: 'GitHub',
      value: '@donhogan',
      icon: Github,
      href: 'https://github.com/donhogan',
    },
    {
      label: 'LinkedIn',
      value: 'in/donhogan',
      icon: Linkedin,
      href: 'https://linkedin.com/in/donhogan',
    },
  ];

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Get in Touch</h1>
        <p className="text-[var(--text-secondary)] mb-6">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Links */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Connect</h2>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg transition-colors',
                  'bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)]',
                  'border border-[var(--border-color)]'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-[var(--bg-tertiary)]'
                  )}
                >
                  <link.icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[var(--text-muted)]">{link.label}</p>
                  <p className="text-[var(--text-primary)] font-medium">{link.value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-[var(--text-muted)]" />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Name</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={cn(
                    'w-full px-3 py-2 rounded-lg transition-colors',
                    'bg-[var(--bg-secondary)] border border-[var(--border-color)]',
                    'text-[var(--text-primary)] placeholder-[var(--text-muted)]',
                    'focus:outline-none focus:border-[var(--accent)]'
                  )}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Email</label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={cn(
                    'w-full px-3 py-2 rounded-lg transition-colors',
                    'bg-[var(--bg-secondary)] border border-[var(--border-color)]',
                    'text-[var(--text-primary)] placeholder-[var(--text-muted)]',
                    'focus:outline-none focus:border-[var(--accent)]'
                  )}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[var(--text-secondary)] mb-1">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={cn(
                    'w-full px-3 py-2 rounded-lg transition-colors resize-none',
                    'bg-[var(--bg-secondary)] border border-[var(--border-color)]',
                    'text-[var(--text-primary)] placeholder-[var(--text-muted)]',
                    'focus:outline-none focus:border-[var(--accent)]'
                  )}
                  placeholder="Your message..."
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={cn(
                  'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg',
                  'font-medium transition-colors',
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
                )}
              >
                {submitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    Sent!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
