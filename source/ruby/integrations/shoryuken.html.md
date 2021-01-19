---
title: "Shoryuken"
---

[Shoryuken] sho-ryu-ken is a super-efficient [AWS SQS][aws-sqs] thread-based
message
processor.

AppSignal supports Shoryuken in Ruby gem version `1.2.0` and up.

No manual installation is required if Shoryuken is part of a Rails app. If
you're using a standalone Shoryuken app, please see our [integration
guide][integration-guide].

Instrumentation for Shoryuken is enabled automatically if the Shoryuken gem is
detected on AppSignal start.

## Batch support

If an app uses worker with the `:batch => true` option, multiple messages are processed by a worker in the same tick. An upgrade is required to Ruby gem `2.11.3` or higher, which adds support for the batch option.

```ruby
# my_worker.rb
class MyWorker
  include Shoryuken::Worker

  shoryuken_options :queue => "batched", :batch => true

  def perform(sqs_msg, body)
    # Do stuff
    puts "Performing BatchedWorker job: #{body}"
    sleep 1
  end
end
```

## Example application

We have an example application for a standalone Shoryuken application available
in our [examples repository][example-app] on GitHub.

[aws-sqs]: https://aws.amazon.com/sqs/
[integration-guide]: /ruby/instrumentation/integrating-appsignal.html
[Shoryuken]: https://github.com/phstc/shoryuken
[example-app]: https://github.com/appsignal/appsignal-examples/tree/shoryuken
