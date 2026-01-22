import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })

    // Get the user from the request cookies
    const { user } = await payload.auth({ headers: request.headers })

    // Check if user is authenticated
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 },
      )
    }
    // Clear Next.js cache
    revalidatePath('/', 'layout')

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
      clearedBy: user.email,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error)?.message || 'Failed to clear cache',
      },
      { status: 500 },
    )
  }
}
