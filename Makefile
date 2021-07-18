.PHONY: blog/_site/ public/

blog/_site/:
	cd blog; bundle exec jekyll build

public/: blog/_site/
	rm -rf public
	mkdir -p public
	cp -r assets labs notes source-serif-pro-release index.html Mert-Bora-Alper-Resume.pdf public/
	cp -r blog/_site public/blog
