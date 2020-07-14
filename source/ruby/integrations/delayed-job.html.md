---
title: "Delayed::Job"
---

[Delayed::Job](https://github.com/collectiveidea/delayed_job) is created by the excellent folks at [Shopify](https://shopifyengineering.myshopify.com/) and one of the most popular background processors for Ruby and Rails.

The AppSignal gem detects Delayed Job when it's present and hooks into the standard Delayed Job callbacks. No further action is required to enable integration.

## Jobs using `display_name`

Delayed Job allows any class to define its own `display_name`. This `display_name` value can interfere with AppSignal's reporting if it is built using dynamic values, such as the arguments given to the job.

If the `display_name` method return value does not return a String with the `ClassName#method_name` format, AppSignal treats each job as a separate entity, creating many Incidents and notifications. This breaks the grouping AppSignal does for these jobs, resulting in AppSignal reporting many unique variations of incidents for the job, and unusable metrics in graphs.

To prevent this from happening, define an `appsignal_name` method that returns a job name using the `ClassName#method_name` format. This way the jobs will be grouped correctly again.

```ruby
class StructJobWithName < Struct.new(:id)
  def perform
    # Do stuff
  end

  # This returns an unique job name, creating new incidents and graphs for each
  # unique job name.
  def display_name
    "StructJobWithName-#{id}"
  end

  # This will group the jobs back to a single entity, allowing incidents
  # and graphs to work properly.
  def appsignal_name
    "StructJobWithName#perform"
  end
end

Delayed::Job.enqueue(StructJobWithName.new("id"))
# Reported as "StructJobWithName#perform"
```

## Changes to the integration

### Queue time

In AppSignal for Ruby gem 2.3.0 a change was made to the queue time registration. In [PR #297](https://github.com/appsignal/appsignal-ruby/pull/297) the start time of the job was used rather than the creation time of the job.

This means that the time from when a job was created until the time it should start is no longer registered as queue time. This will prevent very long queue times from skewing the queue time graphs on AppSignal.com.

## Example applications

Below is a list of example apps available to test the Delayed::Job integration with:

- [AppSignal + Rails 5 + Delayed::Job](https://github.com/appsignal/appsignal-examples/tree/rails-5+delayed_job)
  - The example shows how to set up AppSignal with Delayed::Job and Rails. In the `README` file it lists all known and tested methods of enqueuing jobs that AppSignal supports.
