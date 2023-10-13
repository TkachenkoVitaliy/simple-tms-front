/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-unused-vars */

// Интерфейс Проекта
interface Project {
  id: number // 0 для созданных
  name: string
  description: string
}

// Интерфейс ТестСьюита
interface TestSuite {
  id: number // 0 для созданных
  parentSuiteId: number | null // null - при нахождении в корне
  name: string
  description: string
  projectId?: number // только для создания новой сущности
}

// Интерфейс ТестКейса
interface TestCase {
  id: number // 0 для созданных
  parentSuiteId: number | null // null - при нахождении в корне
  name: string
  preconditions: string
  steps: TestCaseStep[]
  projectId?: number // только для создания новой сущности
}

// Интерфейс тестового шага в ТестКейсе
interface TestCaseStep {
  orderNumber: number
  testStep: TestStep
}

// Union интерфейс для Тестовых шагов
type TestStep = TestStepNonRepeatable | TestStepRepeatable

// Интерфейс Неповторяемого Тестового шага
interface TestStepNonRepeatable extends TestStepBase {
  repeatable: false
}

// Интерфейс Повторяемого Тестового шага
interface TestStepRepeatable extends TestStepBase {
  repeatable: false
  name: string
  projectId?: number // только для создания новой сущности
}

// Общий интерефейс Тестового шага
interface TestStepBase {
  id: number
  action: string
  expected: string
}
