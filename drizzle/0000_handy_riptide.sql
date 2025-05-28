CREATE TABLE "userDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"password" varchar NOT NULL,
	"branch" varchar NOT NULL,
	"collegeMail" varchar NOT NULL,
	"year" varchar NOT NULL,
	"techStack" varchar,
	"refreshToken" varchar,
	CONSTRAINT "userDetails_collegeMail_unique" UNIQUE("collegeMail")
);
