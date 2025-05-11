// DELETE LAMBDA====================================

import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({ region: "us-east-1" }) // Change if your bucket is elsewhere
const BUCKET_NAME = "cms-assets09809" // <-- Change this to your real S3 bucket name

export const handler = async event => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { filename } = body

    if (!filename) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing filename" }),
      }
    }

    const key = `gallery-photos/${filename}` // assumes you store your gallery images in this folder

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Deleted ${filename}` }),
    }
  } catch (error) {
    console.error(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to delete image" }),
    }
  }
}

// UPLOAD IMAGE CMS==============================

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3 = new S3Client({ region: "us-east-1" }) // Adjust region if needed
const BUCKET_NAME = "cms-assets09809" // <<< your actual bucket name

export const handler = async event => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { slug, filename, fileBase64 } = body

    if (!slug || !filename || !fileBase64) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing slug, filename, or fileBase64",
        }),
      }
    }

    // Determine content type from filename
    const ext = filename.split(".").pop()?.toLowerCase()
    let contentType = "image/jpeg" // default fallback

    if (ext === "png") contentType = "image/png"
    if (ext === "webp") contentType = "image/webp"
    if (ext === "jpg" || ext === "jpeg") contentType = "image/jpeg"

    const key = `gallery-photos/${filename}`

    const buffer = Buffer.from(fileBase64, "base64")

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })

    await s3.send(command)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Upload successful", key }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed", details: String(err) }),
    }
  }
}

// ERROR FIX==================================

exports.handler = async () => {
  console.log("OPTIONS Lambda HIT") // <-- add this
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify({ status: "ok" }),
  }
}

// UPLOAD JSON CMS===================================
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3"

const s3 = new S3Client({ region: "us-east-1" })
const BUCKET_NAME = "cms-assets09809" // Your actual bucket name

export const handler = async event => {
  try {
    const body = JSON.parse(event.body || "{}")
    const { data } = body // Expecting { galleryImages: [...] }

    if (!data || !data.galleryImages) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing or invalid data" }),
      }
    }

    const key = `gallery-json/gallery.json`

    // Step 1: Read the existing gallery.json file
    let existingData = { galleryImages: [] }
    try {
      const getCommand = new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
      const s3Object = await s3.send(getCommand)
      const bodyContents = await s3Object.Body.transformToString()
      existingData = JSON.parse(bodyContents)
    } catch (error) {
      if (error.name !== "NoSuchKey") {
        throw error // Rethrow if it's not a "file not found" error
      }
      // If the file doesn't exist, start with an empty galleryImages array
    }

    // Step 2: Append new galleryImages to existing ones
    const updatedGalleryImages = data.galleryImages

    // Step 3: Write the updated JSON back to S3
    const putCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: JSON.stringify({ galleryImages: updatedGalleryImages }, null, 2),
      ContentType: "application/json",
    })
    await s3.send(putCommand)

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "JSON upload successful", key }),
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Upload JSON failed",
        details: String(err),
      }),
    }
  }
}

// S3 bucket policy========
{
  "Version": "2008-10-17",
  "Id": "PolicyForCloudFrontPrivateContent",
  "Statement": [
      {
          "Sid": "AllowCloudFrontServicePrincipal",
          "Effect": "Allow",
          "Principal": {
              "Service": "cloudfront.amazonaws.com"
          },
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::cms-assets09809/*",
          "Condition": {
              "StringEquals": {
                  "AWS:SourceArn": "arn:aws:cloudfront::939344363022:distribution/E36A5LUKAHNC84"
              }
          }
      }
  ]
}

// S3 cors policy==========
[
  {
      "AllowedHeaders": [
          "*"
      ],
      "AllowedMethods": [
          "GET",
          "PUT",
          "POST",
          "DELETE",
          "HEAD"
      ],
      "AllowedOrigins": [
          "*"
      ],
      "ExposeHeaders": [],
      "MaxAgeSeconds": 3000
  }
]