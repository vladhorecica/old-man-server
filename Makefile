.PHONY: help
help: ## Show Help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Install Project
	npm install
	cp -i config.js.dist config.js

.PHONY: tests
tests: ## Run all tests and code quality tools
	@echo "\n\n\n▁ ▂ ▄ ▅ ▆ ▇ █  RUNNING SUPER TESTS  █ ▇ ▆ ▅ ▄ ▂ ▁\n\n\n"
	npm run test:coverage
	@echo "\n\n\n▁ ▂ ▄ ▅ ▆ ▇ █  RUNNING SWAGGER VALIDATION  █ ▇ ▆ ▅ ▄ ▂ ▁\n\n\n"
	npm run test:apidocs
	@echo "\n\n▀▄▀▄▀▄▀▄▀▄▀▄▀▄   TEST SUITES COMPLETED   ▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀\n\n"