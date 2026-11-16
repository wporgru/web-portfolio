import { spawnSync } from 'node:child_process';

// Use versioned content dates. A static rebuild alone is not a revision.
export function readCaseRevisions({cwd=process.cwd(), required=false}={}) {
  const log=spawnSync('git',[
    'log','--format=portfolio-date %cI','--name-only','--diff-filter=AM','--no-renames',
    '--','public/media/projects/',
  ],{cwd,encoding:'utf8',maxBuffer:16*1024*1024,windowsHide:true});
  if (log.status!==0) {
    if (required) throw Error('Could not read case revision history.',{cause:log.error});
    return new Map();
  }

  const revisions=new Map();
  let revision;
  for (const line of log.stdout.split(/\r?\n/)) {
    if (line.startsWith('portfolio-date ')) {
      const ms=Date.parse(line.slice('portfolio-date '.length));
      revision=Number.isFinite(ms) ? new Date(ms).toISOString() : undefined;
    } else if (revision && /^public\/media\/projects\/[a-z0-9-]+\/[a-z0-9_.-]+$/.test(line)) {
      if (!revisions.has(line)) revisions.set(line,revision);
    }
  }
  return revisions;
}

export function latestCaseRevision(revisions, files) {
  return files.map(file=>revisions.get(file)).filter(Boolean).sort().at(-1);
}
