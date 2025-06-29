CREATE TABLE "mentorDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"mentorId" uuid NOT NULL,
	"name" varchar NOT NULL,
	"image" varchar NOT NULL,
	"discord" varchar,
	"linkedIn" varchar NOT NULL,
	"techStack" varchar NOT NULL,
	"bannerKeywords" varchar
);
