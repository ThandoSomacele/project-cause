import Foundation
import Vision
import AppKit

// Reads text and its bounding boxes out of an image. Boxes come back in
// Vision's normalised, bottom-left origin space; converted here to top-left
// pixel coordinates so they line up with the pixel measurements.
let args = CommandLine.arguments
guard args.count > 1, let img = NSImage(contentsOfFile: args[1]),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    FileHandle.standardError.write("usage: ocr <image>\n".data(using: .utf8)!); exit(1)
}
let W = CGFloat(cg.width), H = CGFloat(cg.height)
let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate
req.usesLanguageCorrection = false
try? VNImageRequestHandler(cgImage: cg, options: [:]).perform([req])
print("image \(cg.width)x\(cg.height)")
for obs in (req.results ?? []) {
    guard let top = obs.topCandidates(1).first else { continue }
    let b = obs.boundingBox
    let x = b.minX * W, w = b.width * W
    let y = (1 - b.maxY) * H, h = b.height * H
    print(String(format: "%6.0f %6.0f %6.0f %6.0f  %.2f  %@", x, y, w, h, top.confidence, top.string))
}
