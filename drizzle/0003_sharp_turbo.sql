CREATE TABLE "eventDetails" (
	"name" varchar NOT NULL,
	"startDate" date NOT NULL,
	"endDate" date NOT NULL,
	"imageUrl" varchar DEFAULT 'default.png' NOT NULL,
	"description" varchar NOT NULL,
	"resgistrationLink" varchar NOT NULL,
	"documentLink" varchar NOT NULL,
	"clubName" varchar NOT NULL,
	"ticketPrice" integer DEFAULT 0 NOT NULL,
	"location" varchar NOT NULL,
	"createdBy" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userDetails" RENAME COLUMN "name" TO "firstName";--> statement-breakpoint
ALTER TABLE "userDetails" RENAME COLUMN "isClubHead" TO "roles";--> statement-breakpoint
ALTER TABLE "userDetails" ADD COLUMN "lastName" varchar;