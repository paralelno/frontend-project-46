.PHONY: install lint test gendiff

install:
	npm ci

lint:
	npx eslint .

test:
	npx vitest run

gendiff:
	node gendiff.js
