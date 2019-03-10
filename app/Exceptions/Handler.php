<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        $response = parent::render($request, $e);
        $content = $response->getContent();
        $content = (is_array($content)) ? $content : json_decode($content, true);
        $status = ($response->getStatusCode()) ?: 500;

        if ($this->isHttpException($e) && empty($content)) {
            $status = $e->getStatusCode();
            $content = [
                'error' => \Symfony\Component\HttpFoundation\Response::$statusTexts[$status],
                'message' => $e->getMessage()
            ];
        }

        // Default error message
        if (!isset($content['error'])) {
            $content['error'] = 'Sorry, something went wrong.';
        }

        // Append debug information
        if (config('app.debug')) {
            $content['debug'] = [
                'exception' => get_class($e),
                'message' => $e->getMessage(),
                'trace' => $e->getTrace(),
            ];
        }

        // Return a JSON response with the response array and status code
        return response()->json($content, $status);
    }
}
