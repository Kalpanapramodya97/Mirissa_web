output "website_url" {
  description = "CloudFront Distribution URL — your live website"
  value       = "https://${aws_cloudfront_distribution.website.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront Distribution ID (needed for GitHub Secrets)"
  value       = aws_cloudfront_distribution.website.id
}

output "s3_bucket_name" {
  description = "S3 Bucket Name (needed for GitHub Secrets)"
  value       = aws_s3_bucket.website.id
}

output "deploy_access_key_id" {
  description = "Access Key ID for CI/CD (add to GitHub Secrets as AWS_ACCESS_KEY_ID)"
  value       = aws_iam_access_key.deploy.id
}

output "deploy_secret_access_key" {
  description = "Secret Access Key for CI/CD (add to GitHub Secrets as AWS_SECRET_ACCESS_KEY)"
  value       = aws_iam_access_key.deploy.secret
  sensitive   = true
}
