.PHONY: blog/_site/ public/ serve

blog/_site/:
	cd blog; bundle install && bundle exec jekyll build

public/: blog/_site/
	rm -rf public
	mkdir -p public
	cp -r assets labs notes resume default.css index.html .well-known public/
	cp -r blog/_site public/blog
