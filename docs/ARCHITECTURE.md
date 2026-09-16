# State Services — Architecture

## Product vision

State Services is a service-commerce platform. The core flow is not a traditional product cart: it is a service request that can become a quote, appointment and work order.

## Main flow

1. Customer selects a service.
2. Customer describes the need and can provide address, preferred date and attachments.
3. Platform creates a service request.
4. Company can quote or confirm the request according to the service pricing model.
5. Accepted work becomes a work order.
6. A provider/team member is assigned.
7. Work-order events record operational progress.
8. Completion can lead to payment and review.

## Pricing models

- `fixed`
- `starting_at`
- `hourly`
- `per_square_meter`
- `quote`
- `technical_visit`

Prices must not be calculated from display strings. Monetary values should be stored in cents in the front-end domain layer and validated/recalculated by the backend when it is introduced.

## Planned domain

- organizations
- branches
- profiles
- customers
- customer_addresses
- providers
- service_categories
- services
- provider_services
- service_requests
- request_attachments
- quotes
- quote_items
- appointments
- work_orders
- work_order_events
- payments
- reviews
- notifications

## Work-order lifecycle

Primary path:

`requested -> quoted -> awaiting_confirmation -> confirmed -> assigned -> on_the_way -> in_progress -> completed`

Terminal/exception states are modeled explicitly, including `cancelled`. Payment/refund state should remain separate from operational work-order state.

## Multi-tenant direction

Business-owned records should be designed to support an `organization_id`. This enables future white-label deployments without mixing tenant data or rebuilding the domain for each customer.

## Front-end migration strategy

The current application remains operational while modules are extracted incrementally into `src/`.

Initial modules:

- `src/data`: temporary catalog/domain data before backend integration.
- `src/utils`: formatting and shared utilities.
- `src/store`: client state.
- `src/services`: application/use-case layer and future API adapters.
- `src/components`: UI components.

The next milestone replaces the legacy cart semantics with a service-request flow while preserving a usable public site.

## Backend milestone

Supabase integration should only follow the domain migration. The backend milestone will cover PostgreSQL schema, Auth, Storage, RLS, Realtime where justified, indexes, constraints and auditable status transitions.
