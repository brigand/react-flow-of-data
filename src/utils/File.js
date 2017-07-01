/**
 * File is a weird object. It represents a file with varying levels of information.
 * The first time one's constructed, it might have no metadata or content.
 * Then you can call file.withMeta() to get a Promise<File> which contains metadata.
 * Similarly, file.withContent() fetches the content of the file (a string)
 * File may also be a directory; the metadata reveals this with file.meta.isDirectory.
 *
 * fs: an instance from utils/makeFs.js
 * loc: a path to the file, relative to the current workign directory
 * meta: an object with metadata (to be defined)
 * content: a string representaion of the file content
 */
class File {
  constructor(fs, loc, meta = null, content = null) {
    this.fs = fs;
    this.loc = loc;
    this.name = loc.split('/').pop();

    if (meta) {
      this.meta = meta;
    } else {
      this.needsMeta = true;
    }

    if (content != null) {
      this.content = content;
    } else {
      this.needsContent = true;
    }
  }

  toJSON() {
    return {
      loc: this.loc,
      name: this.name,
      meta: this.meta,
      content: this.content && this.content.slice(0, 30) + '…',
    };
  }

  withMeta() {
    return Promise.resolve().then(() => {
      if (!this.needsMeta) return this;
      return this.fs.statP(this.loc).then((stats) => {
        const meta = {isDirectory: stats.isDirectory()};
        return new File(this.fs, this.loc, meta, this.content);
      });
    });
  }

  withContent() {
    return Promise.resolve().then(() => {
      if (!this.needsContent) return this;
      return this.fs.readP(this.loc).then((content) => {
        return new File(this.fs, this.loc, this.stats, content);
      });
    });
  }

  withAll() {
    return Promise.resolve().then(() => {
      if (this.needsMeta) return this.withMeta().then(x => x.withContent());
      if (this.needsContent) return this.withContent().then(x => x.withMeta());
      return this;
    });
  }
}

module.exports = File;

