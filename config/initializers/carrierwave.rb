CarrierWave.configure do |config|
  config.fog_credentials = {
    :provider  => 'AWS',  # required
    :aws_access_key_id  => "#{Rails.application.secrets.aws_access_key}",  # required
    :aws_secret_access_key  => "#{Rails.application.secrets.aws_secret_access_key}",  # required
    :region => 'eu-west-1',  # optional, defaults to 'us-east-1'
  }
  config.fog_directory  = "#{Rails.application.secrets.aws_bucket_key}"  # required
  config.fog_public  = true  # optional, defaults to true
end