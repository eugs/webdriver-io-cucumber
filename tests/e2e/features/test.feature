Feature: Test 1

  Scenario: First
    Given I am on "Home" page
    When I click on "Menu -> Feature" button
    Then I should be on "Features" page
    When I click on "Menu -> Feature" button

  # Scenario: Second
  #   Given I am on "Home" page
  #   When I click on "#1 of Packages" button
  #   And I wait "5" second(s)