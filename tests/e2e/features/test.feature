Feature: Test 1

  @logout
   Scenario: Login
     Given I am on "Home" page
     When I click on "Menu -> Login" button
     Then I should be on "Login" page
     Then I wait element "Username" visibility for "5" seconds
     Then Element "Username" should be visible
     Then I enter text "$$User" in "Username" element
     Then I enter text "$$Password" in "Password" element
     When I click on "Login" button
     Then I should be on "Home" page

  @login
  Scenario: Logout
    Given I am on "Home" page
    When I click on "Menu -> User Button" button
    Then I click on "Menu -> User Dropdown -> Logout" button
    Then Element "Menu -> Login" should be visible

  Scenario Outline: : Search wdio package
    Given I am on "Home" page
    When I click on "Menu -> Search" button
    Then I enter text "wdio" in "Menu -> Search" element
    When I press "Enter" key
    Then I should be on "Search" page
    Then I'm looking for "wdio" value of "Package -> Package Name" elements and click it
    Then I should be on "Package" page
    When I click on "<Tab> Tab" button
    Then Element "Active <Tab> Tab" should be visible
    Then Element "<Tab> Info" should be visible
    Examples:
      |Tab           |
      |Readme        |
      |Dependencies  |
      |Dependents    |
      |Versions      |

    @luboitag
  Scenario: : Check sorted versions
    Given I am on "Home" page
    When I click on "Menu -> Search" button
    Then I enter text "wdio" in "Menu -> Search" element
    When I press "Enter" key
    Then I should be on "Search" page
    Then I wait element "Package" visibility for "5" seconds
    Then I'm looking for "wdio" value of "Package -> Package Name" elements and click it
    Then I should be on "Package" page
    When I click on "Versions Tab" button
    Then Check sorted "Versions" element values