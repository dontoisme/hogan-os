import { profile } from '@/data/profile';
import { experiences } from '@/data/experience';

export interface TermLine {
  text: string;
  style?: 'plain' | 'accent' | 'muted' | 'error' | 'success';
}

export interface CommandResult {
  lines: TermLine[];
  action?: 'clear' | 'exit' | { open: string };
}

const line = (text: string, style?: TermLine['style']): TermLine => ({ text, style });

// Deterministic fake short hash per experience id
function fakeHash(id: string): string {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h.toString(16).padStart(7, '0').slice(0, 7);
}

// Punchy one-line commit messages per role (resume-verified metrics only);
// falls back to the experience description for anything not listed.
const commitMessages: Record<string, string> = {
  msk: 'feat(msk): improve new-patient conversion ~20% for mskcc.org',
  gethealthy: 'feat(gethealthy): ship 5-agent AI orchestration across Epic/Cerner/Athena',
  zenbusiness: 'feat(zenbusiness): +8% conversion (~1,500 customers/day), experimentation +250%',
  wellcore: 'feat(wellcore): grow ARR $100K→$1.8M, churn −60%, LTV +112%',
  mattermost: 'feat(mattermost): signups +270%, D14 activation 8%→25%',
  indeed: 'feat(indeed): experimentation platform for 5 teams, velocity +600%',
  clearhead: 'feat(sonos): checkout redesign ships, $12MM YoY revenue impact',
  sparefoot: 'chore(sparefoot): marketplace PM reps',
  ibm: 'init(ibm): product + design + BPM consulting',
};

function gitLog(): TermLine[] {
  const commits = experiences.map((exp, i) => {
    const msg = commitMessages[exp.id] ?? `feat(${exp.id}): ${exp.description}`;
    const head = i === 0 ? ' (HEAD -> main)' : '';
    return line(`${fakeHash(exp.id)}${head} ${msg}`, i === 0 ? 'accent' : 'plain');
  });
  return [
    ...commits,
    line(`0000001 Initial commit: OU BBA — entrepreneurship + finance ('10)`, 'muted'),
  ];
}

const manPage: TermLine[] = [
  line('DON(1)                        Hogan Manual                        DON(1)', 'muted'),
  line(''),
  line('NAME', 'accent'),
  line('       don - senior product leader; connects UX, code, and data'),
  line(''),
  line('SYNOPSIS', 'accent'),
  line('       don [--growth] [--health-tech] [--ai-native] [--outdoors]'),
  line(''),
  line('OPTIONS', 'accent'),
  line('       --growth       ships funnels, experiments, and activation wins'),
  line('       --health-tech  Medicare/CMS, EMRs, patient conversion at MSK'),
  line('       --ai-native    multi-agent orchestration; built this site with Claude Code'),
  line('       --outdoors     trail rides, former climbing guide, barehanded fishing'),
  line(''),
  line('BUGS', 'accent'),
  line('       Will reference Douglas Adams at inappropriate moments.'),
  line('       Cannot pass a whiteboard without drawing a funnel on it.'),
  line(''),
  line('SEE ALSO', 'accent'),
  line('       resume(1), experience(1), contact(1)'),
];

const helpLines: TermLine[] = [
  line('Available commands:', 'accent'),
  line('  whoami                who is this guy'),
  line('  git log --oneline     the career, as commits'),
  line('  ls [-la]              look around'),
  line('  man don               the manual'),
  line('  open <app>            open resume | projects | experience | contact | zoo'),
  line('  sudo hire don         you know you want to'),
  line('  make coffee           worth a try'),
  line('  clear                 clean slate'),
  line('  exit                  nice try'),
];

export function runCommand(rawInput: string): CommandResult {
  const input = rawInput.trim();
  const [cmd, ...args] = input.split(/\s+/);
  const arg = args.join(' ');

  switch (cmd) {
    case '':
      return { lines: [] };

    case 'help':
      return { lines: helpLines };

    case 'whoami':
      return {
        lines: [
          line(`${profile.name.toLowerCase().replace(' ', '')} — ${profile.title}`, 'accent'),
          line(profile.tagline),
          line(`currently: improving conversion for new cancer patients at Memorial Sloan Kettering`, 'muted'),
        ],
      };

    case 'pwd':
      return { lines: [line('/Users/don/career')] };

    case 'ls':
      if (args.includes('-la') || args.includes('-al') || args.includes('-a')) {
        return {
          lines: [
            line('drwxr-xr-x   don  staff   .', 'muted'),
            line('drwxr-xr-x   don  staff   ..', 'muted'),
            line('-rw-------   don  staff   .imposter-syndrome    (hidden, mostly)', 'muted'),
            line('-rw-r--r--   don  staff   .growth-mindset', 'muted'),
            line('-rw-r--r--   don  staff   .konami-code          (↑↑↓↓←→←→BA)', 'muted'),
            line('drwxr-xr-x   don  staff   SideQuests/'),
            line('drwxr-xr-x   don  staff   FieldGuide/           (the whole zoo)'),
            line('-rw-r--r--   don  staff   resume.pdf'),
            line('-rw-r--r--   don  staff   thoughts.txt'),
          ],
        };
      }
      return {
        lines: [
          line('SideQuests/    FieldGuide/    resume.pdf    thoughts.txt'),
        ],
      };

    case 'git':
      if (arg.startsWith('log')) return { lines: gitLog() };
      if (arg === '' ) return { lines: [line("usage: git log --oneline   (it's the only thing I versioned)", 'muted')] };
      return { lines: [line(`git: '${arg}' is not a git command here. Try 'git log --oneline'.`, 'error')] };

    case 'man':
      if (arg === 'don') return { lines: manPage };
      return { lines: [line(`No manual entry for ${arg || '(nothing)'} — try 'man don'`, 'error')] };

    case 'sudo':
      if (arg === 'hire don') {
        return {
          lines: [
            line('[sudo] password for recruiter: ********'),
            line('Authenticating .......... OK', 'muted'),
            line('Checking references ..... OK', 'muted'),
            line('Verifying metrics ....... OK (they’re on the resume)', 'muted'),
            line('Access granted. Offer letter queued.', 'success'),
            line('Welcome aboard! 🎉  (say hi: ' + profile.email + ')', 'accent'),
          ],
        };
      }
      return { lines: [line(`sudo: only 'sudo hire don' is permitted on this system`, 'error')] };

    case 'open': {
      const valid = ['resume', 'projects', 'experience', 'contact', 'about', 'readme', 'zoo'];
      if (arg === 'zoo') return { lines: [line('Opening the field guide... mind the dingo.', 'muted')], action: { open: 'field-guide' } };
      if (valid.includes(arg)) return { lines: [line(`Opening ${arg}...`, 'muted')], action: { open: arg } };
      return { lines: [line(`open: '${arg || ''}' — try: open ${valid.slice(0, 4).join(' | ')}`, 'error')] };
    }

    case 'make':
      if (arg === 'coffee') {
        return { lines: [line("make: *** No rule to make target 'coffee'. Stop.", 'error'), line('(the espresso machine is load-bearing) ☕', 'muted')] };
      }
      return { lines: [line(`make: *** No rule to make target '${arg}'. Stop.`, 'error')] };

    case 'clear':
      return { lines: [], action: 'clear' };

    case 'exit':
      return {
        lines: [line('Nice try. Where else would you go — LinkedIn?', 'muted')],
        action: 'exit',
      };

    default:
      return {
        lines: [
          line(`command not found: ${cmd}`, 'error'),
          line("try 'help'", 'muted'),
        ],
      };
  }
}

export const WELCOME_LINES: TermLine[] = [
  line('HoganOS Terminal — type `help` to get started, or `git log --oneline` for the good stuff.', 'muted'),
];
