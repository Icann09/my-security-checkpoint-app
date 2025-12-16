CREATE TABLE "checkpoints" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"checkpoint_number" integer NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "checkpoints_checkpoint_number_unique" UNIQUE("checkpoint_number")
);
--> statement-breakpoint
CREATE TABLE "guards" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"nip" text NOT NULL,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "guards_nip_unique" UNIQUE("nip")
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"guard_id" uuid NOT NULL,
	"checkpoint_id" uuid NOT NULL,
	"report_date" date NOT NULL,
	"shift" text DEFAULT 'unknown' NOT NULL,
	"image_url" text NOT NULL,
	"taken_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"name" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "guards" ADD CONSTRAINT "guards_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_guard_id_guards_id_fk" FOREIGN KEY ("guard_id") REFERENCES "public"."guards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_checkpoint_id_checkpoints_id_fk" FOREIGN KEY ("checkpoint_id") REFERENCES "public"."checkpoints"("id") ON DELETE no action ON UPDATE no action;