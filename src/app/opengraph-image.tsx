import { ImageResponse } from 'next/og';
import { profile } from '@/data/profile';

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 55%, #09090b 100%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', fontSize: 24, color: '#71717a', marginBottom: 28 }}>
          HOGANOS v1.0 — boot complete_
        </div>
        <div style={{ display: 'flex', fontSize: 76, fontWeight: 700, marginBottom: 14 }}>
          {profile.name}
        </div>
        <div style={{ display: 'flex', fontSize: 36, color: '#a1a1aa', marginBottom: 52 }}>
          {profile.title} · {profile.location}
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {profile.headlineStats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 28px',
                borderRadius: 16,
                border: '1px solid #3f3f46',
                background: 'rgba(39,39,42,0.6)',
              }}
            >
              <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>{stat.value}</div>
              <div style={{ display: 'flex', fontSize: 20, color: '#a1a1aa', marginTop: 8 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
