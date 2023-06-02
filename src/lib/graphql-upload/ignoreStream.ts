// @ts-check

/**
 * Safely ignores a Node.js readable stream.
 * @param {import("node:stream").Readable} stream Node.js readable stream.
 */
export default function ignoreStream(stream: any) {
  // Prevent an unhandled error from crashing the process.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stream.on("error", () => {});

  // Waste the stream.
  stream.resume();
}
