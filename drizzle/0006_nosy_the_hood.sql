DROP TABLE IF EXISTS "mentorDetails";
CREATE TABLE "mentorDetails" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"image" varchar NOT NULL,
	"discord" varchar,
	"linkedIn" varchar NOT NULL,
	"techStack" varchar NOT NULL,
	"bannerKeywords" varchar
);