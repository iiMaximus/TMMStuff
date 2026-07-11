import Foundation
import Vision
import ImageIO

struct Line: Codable {
    let text: String
    let x: Double
    let y: Double
    let w: Double
    let h: Double
}

let args = CommandLine.arguments.dropFirst()
guard !args.isEmpty else {
    fputs("Usage: ocr.swift image.png [image.png ...]\n", stderr)
    exit(2)
}

var all: [String: [Line]] = [:]

for arg in args {
    let url = URL(fileURLWithPath: arg)
    guard
        let src = CGImageSourceCreateWithURL(url as CFURL, nil),
        let image = CGImageSourceCreateImageAtIndex(src, 0, nil)
    else {
        all[arg] = []
        continue
    }

    let request = VNRecognizeTextRequest()
    request.recognitionLevel = .accurate
    request.usesLanguageCorrection = false
    request.minimumTextHeight = 0.008

    let handler = VNImageRequestHandler(cgImage: image, orientation: .up, options: [:])
    do {
        try handler.perform([request])
    } catch {
        fputs("OCR failed for \(arg): \(error)\n", stderr)
        all[arg] = []
        continue
    }

    let lines = (request.results ?? []).compactMap { obs -> Line? in
        guard let candidate = obs.topCandidates(1).first else { return nil }
        let box = obs.boundingBox
        // Vision uses a bottom-left origin with normalized coordinates. Convert to top-left.
        return Line(
            text: candidate.string,
            x: Double(box.minX),
            y: Double(1.0 - box.maxY),
            w: Double(box.width),
            h: Double(box.height)
        )
    }.sorted {
        if abs($0.y - $1.y) > 0.012 { return $0.y < $1.y }
        return $0.x < $1.x
    }
    all[arg] = lines
}

let enc = JSONEncoder()
enc.outputFormatting = [.prettyPrinted, .sortedKeys]
let data = try enc.encode(all)
FileHandle.standardOutput.write(data)
