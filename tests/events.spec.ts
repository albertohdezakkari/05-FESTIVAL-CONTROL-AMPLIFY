import { test, expect } from '@playwright/test';

test('programación, CRUD, estados, filtros y reinicio de memoria', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByText('LIVE DEMO', { exact: false })).toBeVisible();
  await page.screenshot({ path: `test-results/dashboard-${test.info().project.name}.png`, fullPage: true });
  const cards = page.locator('[data-testid^="event-"]');
  await expect(cards).toHaveCount(3);
  await expect(cards.first()).toContainText('ELECTRIC SUNSET');
  await page.getByRole('button', { name: 'EVENTOS', exact: true }).click();
  await expect(cards).toHaveCount(4);
  await page.getByRole('button', { name: 'MAIN STAGE', exact: true }).click();
  await expect(cards).toHaveCount(2);
  await page.getByLabel('Buscar artista o ID').fill('evt-101');
  await expect(cards).toHaveCount(1);
  await page.getByLabel('Buscar artista o ID').fill('inexistente');
  await expect(page.getByText('No hay eventos con ese filtro.')).toBeVisible();
  // Crear desde un filtro sin resultados debe mostrar el nuevo evento al guardar.
  await page.getByRole('button', { name: '+ NUEVO EVENTO', exact: true }).click();
  await page.getByRole('button', { name: 'CREAR EVENTO', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Introduce un artista');
  await page.getByLabel('Artista', { exact: true }).fill('TECHNO TITANS');
  for (const invalid of ['24:00', '12:60', '9:30']) {
    await page.getByLabel('Hora', { exact: true }).fill(invalid);
    await page.getByRole('button', { name: 'CREAR EVENTO', exact: true }).click();
    await expect(page.getByRole('alert')).toContainText('HH:MM');
  }
  await page.getByLabel('Hora', { exact: true }).fill('21:45');
  await page.getByRole('button', { name: 'CREAR EVENTO', exact: true }).click();
  await expect(cards).toHaveCount(5);
  await page.getByRole('button', { name: 'DASHBOARD', exact: true }).click();
  await expect(page.getByTestId('stat-EVENTOS')).toContainText('05');
  await expect(page.getByTestId('stat-CONFIRMADOS')).toContainText('04');
  await page.getByRole('button', { name: 'EVENTOS', exact: true }).click();
  const created = page.getByTestId('event-EVT-105');
  await expect(created).toContainText('TECHNO TITANS');
  await created.scrollIntoViewIfNeeded();
  await page.screenshot({ path: `test-results/events-${test.info().project.name}.png` });
  await created.getByRole('button', { name: 'EDITAR', exact: true }).click();
  await page.getByLabel('Artista', { exact: true }).fill('  techno titans  ');
  await page.getByLabel('Hora', { exact: true }).fill('23:00');
  await page.getByRole('button', { name: 'CANCELLED', exact: true }).click();
  await page.getByRole('button', { name: 'GARDEN', exact: true }).click();
  await page.getByRole('button', { name: 'GUARDAR CAMBIOS' }).click();
  await expect(created).toContainText('23:00');
  await expect(created).toContainText('GARDEN');
  await expect(created).toContainText('TECHNO TITANS');
  await expect(created).toContainText('CANCELLED');
  await created.getByRole('button', { name: 'CAMBIAR ESTADO' }).click();
  await expect(created).toContainText('CONFIRMED');
  for (const status of ['DELAYED', 'CANCELLED', 'CONFIRMED']) {
    await created.getByRole('button', { name: 'CAMBIAR ESTADO' }).click();
    await expect(created).toContainText(status);
  }
  await created.getByRole('button', { name: 'EDITAR', exact: true }).click();
  await page.getByLabel('Artista', { exact: true }).fill('DESCARTADO');
  await page.getByRole('button', { name: 'CANCELAR', exact: true }).click();
  await expect(created).toContainText('TECHNO TITANS');
  await created.getByRole('button', { name: 'ELIMINAR' }).click();
  await expect(cards).toHaveCount(4);
  await page.getByTestId('event-EVT-101').getByRole('button', { name: 'ELIMINAR' }).click();
  await expect(cards).toHaveCount(3);
  await page.reload();
  await page.getByRole('button', { name: 'EVENTOS', exact: true }).click();
  await expect(cards).toHaveCount(4);
  expect(errors).toEqual([]);
});

test('dashboard, orden nocturno, vacío y adaptación a pantalla', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('[data-testid^="event-"]');
  await page.getByTestId('event-EVT-103').getByRole('button', { name: 'ELIMINAR' }).click();
  await expect(cards.last()).toContainText('00:30');
  // Cancelar NEON WAVES lo excluye de próximos eventos.
  const neon = page.getByTestId('event-EVT-101');
  await neon.getByRole('button', { name: 'CAMBIAR ESTADO' }).click();
  await neon.getByRole('button', { name: 'CAMBIAR ESTADO' }).click();
  await expect(neon).toHaveCount(0);
  await page.getByRole('button', { name: 'EVENTOS', exact: true }).click();
  while (await cards.count()) await cards.first().getByRole('button', { name: 'ELIMINAR' }).click();
  await expect(page.getByText('No hay eventos con ese filtro.')).toBeVisible();
  await page.getByRole('button', { name: 'DASHBOARD', exact: true }).click();
  await expect(page.getByText('No hay próximos eventos.')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

for (const width of [320, 390, 860, 1440]) {
  test(`sin desbordamiento horizontal a ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 });
    await page.goto('/');
    await expect(page.getByText('PANEL DE CONTROL', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByRole('button', { name: '+ NUEVO EVENTO', exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
