"use strict";
// Load the SDK
const AWS = require('aws-sdk')
const Stream = require('stream')
const Speaker = require('speaker')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})



let params = {
    'Text': 'Hi, my name is Dexter.',
    'OutputFormat': 'pcm',
    'VoiceId': 'Kimberly'
}


module.exports.speak = function(text){

  // Create the Speaker instance
  const Player = new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
  })

  Polly.synthesizeSpeech({
      'Text': text,
      'OutputFormat': 'pcm',
      'VoiceId': 'Kimberly'
  }, (err, data) => {
      if (err) {
          console.log(err.code)
      } else if (data) {
          if (data.AudioStream instanceof Buffer) {
              // Initiate the source
              var bufferStream = new Stream.PassThrough()
              // convert AudioStream into a readable stream
              bufferStream.end(data.AudioStream)
              // Pipe into Player
              bufferStream.pipe(Player)
          }
      }
  })

}
