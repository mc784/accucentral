
import { NextResponse } from 'next/server';
import { getPatientById } from '@/data/patients';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ message: 'Patient ID is required' }, { status: 400 });
    }

    const patient = getPatientById(id);

    if (!patient) {
      return NextResponse.json({ message: `Patient with ID ${id} not found` }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
