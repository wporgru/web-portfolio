import { spawnSync } from 'node:child_process';

// Use versioned editorial sources. A static rebuild alone is not a revision.
export function readContentRevisions({cwd=process.cwd(), required=false, guideFiles=[]}={}) {
  const guidePaths=new Set(guideFiles);
  const log=spawnSync('git',[
    'log','--format=portfolio-date %cI','--name-only','--diff-filter=AM','--no-renames',
    '--','public/media/projects/',...guidePaths,
  ],{cwd,encoding:'utf8',maxBuffer:16*1024*1024,windowsHide:true});
  if (log.status!==0) {
    if (required) throw Error('Could not read content revision history.',{cause:log.error});
    return new Map();
  }

  const revisions=new Map();
  let revision;
  for (const line of log.stdout.split(/\r?\n/)) {
    if (line.startsWith('portfolio-date ')) {
      const ms=Date.parse(line.slice('portfolio-date '.length));
      revision=Number.isFinite(ms) ? new Date(ms).toISOString() : undefined;
    } else if (revision && (guidePaths.has(line) || /^public\/media\/projects\/[a-z0-9-]+\/[a-z0-9_.-]+$/.test(line))) {
      if (!revisions.has(line)) revisions.set(line,revision);
    }
  }
  return revisions;
}

export function latestContentRevision(revisions, files) {
  return files.map(file=>revisions.get(file)).filter(Boolean).sort().at(-1);
}
